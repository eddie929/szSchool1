<template>
  <div v-if="easyFlowVisible" style="height: calc(80vh)">
    <el-row>
      <!--顶部工具菜单-->
      <el-col :span="24">
        <div class="ef-tooltar">
          <el-link type="primary" :underline="false">{{ data.name }}</el-link>
          <el-divider direction="vertical" />
          <!-- <el-button
            type="text"
            icon="el-icon-delete"
            size="large"
            @click="deleteElement"
            :disabled="!this.activeElement.type"
          ></el-button> -->
          <!--
                    <el-divider direction="vertical" v-if="false"></el-divider>
                    <el-button type="text" icon="el-icon-download" size="large" @click="downloadData" v-if="false"></el-button>
                    <el-divider direction="vertical" v-if="false"></el-divider>
                    <el-button type="text" icon="el-icon-plus" size="large" @click="zoomAdd" v-if="false"></el-button>
                    <el-divider direction="vertical" v-if="false"></el-divider>
                    <el-button type="text" icon="el-icon-minus" size="large" @click="zoomSub" v-if="false"></el-button>
                    <div style="float: right;margin-right: 5px" v-if="false">
                        <el-button type="info" plain round icon="el-icon-document" @click="dataInfo" size="mini">流程信息</el-button>
                        <el-button type="primary" plain round @click="dataReloadA" icon="el-icon-refresh" size="mini">切换流程A</el-button>
                        <el-button type="primary" plain round @click="dataReloadB" icon="el-icon-refresh" size="mini">切换流程B</el-button>
                        <el-button type="primary" plain round @click="dataReloadC" icon="el-icon-refresh" size="mini">切换流程C</el-button>
                        <el-button type="primary" plain round @click="dataReloadD" icon="el-icon-refresh" size="mini">自定义样式</el-button>
                        <el-button type="primary" plain round @click="dataReloadE" icon="el-icon-refresh" size="mini">力导图</el-button>
                        <el-button type="info" plain round icon="el-icon-document" @click="openHelp" size="mini">帮助</el-button>
                    </div> -->
        </div>
      </el-col>
    </el-row>
    <div style="display: flex; height: calc(100% - 47px)">
      <div style=" border-right: 1px solid #dce3e8">
        <transition name="el-zoom-in-top">
          <node-menu v-show="showmenu" ref="nodeMenu" @addNode="addNode" />
        </transition>
      </div>
      <div id="efContainer" ref="efContainer" v-flowDrag class="container">
        <template v-for="node in data.nodeList">
          <flow-node
            :id="node.id"
            :key="node.id"
            :node="node"
            :active-element="activeElement"
            @changeNodeSite="changeNodeSite"
            @nodeRightMenu="nodeRightMenu"
            @clickNode="clickNode"
          />
        </template>
        <!-- 给画布一个默认的宽度和高度 -->
        <div style="position: absolute; top: 2000px; left: 2000px">&nbsp;</div>
      </div>
      <!-- 右侧表单 -->
      <div
        style="
          border-left: 1px solid #dce3e8;
          background-color: #fbfbfb;
        "
      >
        <transition name="el-zoom-in-top">
          <flow-node-form
            v-show="showform"
            ref="nodeForm"
            @setLineLabel="setLineLabel"
            @repaintEverything="repaintEverything"
            @nodeSave="nodeSave"
            @Modify="Modify"
            @deleteElement="deleteElement"
          />
        </transition>
      </div>
    </div>
    <!-- 流程数据详情 -->
    <flow-info v-if="flowInfoVisible" ref="flowInfo" :data="data" />
    <flow-help v-if="flowHelpVisible" ref="flowHelp" />
  </div>
</template>

<script>
import {
  insert_node,
  alter_flownode,
  del_node,
  insert_nodeline,
  del_nodeline,
  alter_nodeline,
  insert_nodebinding,
  alter_nodebinding
} from '@/api/flowhandle'
// import { jsPlumb } from 'jsplumb'
// 使用修改后的jsplumb
import './jsplumb'
// import { easyFlowMixin } from '@/components/ef/mixins'
import { easyFlowMixin } from './mixins'
// import flowNode from '@/components/ef/node'
import flowNode from './node'
// import nodeMenu from '@/components/ef/node_menu'
import nodeMenu from './node_menu'
// import FlowInfo from '@/components/ef/info'
import FlowInfo from './info'
// import FlowHelp from '@/components/ef/help'
import FlowHelp from './help'
// import FlowNodeForm from './node_form'
import FlowNodeForm from './node_form'
import lodash from 'lodash'

export default {
  components: {
    flowNode,
    nodeMenu,
    FlowInfo,
    FlowNodeForm,
    FlowHelp
  },
  directives: {
    flowDrag: {
      bind(el, binding, vnode, oldNode) {
        if (!binding) {
          return
        }
        el.onmousedown = e => {
          if (e.button === 2) {
            // 右键不管
            return
          }
          //  鼠标按下，计算当前原始距离可视区的高度
          let disX = e.clientX
          let disY = e.clientY
          el.style.cursor = 'move'

          document.onmousemove = function(e) {
            // 移动时禁止默认事件
            e.preventDefault()
            const left = e.clientX - disX
            disX = e.clientX
            el.scrollLeft += -left

            const top = e.clientY - disY
            disY = e.clientY
            el.scrollTop += -top
          }

          document.onmouseup = function(e) {
            el.style.cursor = 'auto'
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  },
  // 一些基础配置移动该文件中
  mixins: [easyFlowMixin],
  data() {
    return {
      // 隐藏
      showform: true,
      showmenu: true,
      // 记载节点ID
      flowid: '',
      // jsPlumb 实例
      jsPlumb: null,
      // 控制画布销毁
      easyFlowVisible: true,
      // 控制流程数据显示与隐藏
      flowInfoVisible: false,
      // 是否加载完毕标志位
      loadEasyFlowFinish: false,
      flowHelpVisible: false,
      // 数据
      data: {},
      // 激活的元素、可能是节点、可能是连线
      activeElement: {
        // 可选值 node 、line
        type: undefined,
        // 节点ID
        nodeId: undefined,
        // 连线ID
        sourceId: undefined,
        targetId: undefined
      },
      zoom: 0.5
    }
  },
  mounted() {
    this.jsPlumb = jsPlumb.getInstance()
    // console.log(getDataB());
    this.$nextTick(() => {
      // 默认加载流程A的数据、在这里可以根据具体的业务返回符合流程数据格式的数据即可
      // this.dataReload(getDataB());
    })
  },
  methods: {
    // 保存新增节点
    nodeSave(val) {
      const nodedata = {
        fk_flow: this.flowid,
        style: '',
        task: val.type,
        name: val.name,
        fk_icon: val.icoid,
        coordinates_x: val.left,
        coordinates_y: val.top,
        remark: '',
        process_way: '0',
        outside: '0'
      }
      insert_node(nodedata).then(res => {
        if (res.code > 0) {
          this.$emit('getnodeid', this.flowid)
          this.$notify({
            title: '成功',
            message: '节点创建成功',
            type: 'success'
          })
        } else if (res.code === 101) console.log('参数无效')
        else if (res.code === 102) console.log('参数为空')
        else if (res.code === -1) console.log('请求失败')
      })
    },
    // 修改
    Modify(val, bindingList) {
      var data = {
        id: parseInt(val.id),
        name: val.name,
        fk_flow: this.flowid,
        task: val.type,
        fk_icon: val.icoid,
        coordinates_x: val.left,
        coordinates_y: val.top,
        remark: '',
        process_way: val.process_way,
        outside: val.outside,
        style: val.style !== '' ? val.style : ''
      }
      alter_flownode(data).then(res => {
        if (res.code === 100) {
          bindingList.fk_node = parseInt(val.id)
          bindingList.fk_flow = this.flowid
          if (val.mnode_binding.id === undefined) {
            insert_nodebinding(bindingList).then(res => {
              this.alter_box(100, '修改成功!')
              this.$emit('getnodeid', this.flowid)
            })
          } else {
            bindingList.id = val.mnode_binding.id
            alter_nodebinding(bindingList).then(res => {
              this.alter_box(100, '修改成功!')
              this.$emit('getnodeid', this.flowid)
            })
          }
        }
      })
    },
    // 返回唯一标识
    getUUID() {
      return Math.random()
        .toString(36)
        .substr(3, 10)
    },
    jsPlumbInit() {
      this.jsPlumb.ready(() => {
        // 导入默认配置
        this.jsPlumb.importDefaults(this.jsplumbSetting)
        // 会使整个jsPlumb立即重绘。
        this.jsPlumb.setSuspendDrawing(false, true)
        // 初始化节点
        this.loadEasyFlow()
        // 单点击了连接线, https://www.cnblogs.com/ysx215/p/7615677.html
        this.jsPlumb.bind('click', (conn, originalEvent) => {
          // console.log(this.data.lineList);
          // 判断取得  线ID
          var lineid = ''
          var conditions = '' // 条件
          for (var i = 0; i < this.data.lineList.length; i++) {
            // console.log("循环")
            // console.log(this.data.lineList[i])
            if (
              this.data.lineList[i].from == conn.sourceId &&
              this.data.lineList[i].to == conn.targetId
            ) {
              // console.log(this.data.lineList[i]);
              // console.log("就这个!");
              lineid = this.data.lineList[i].id
              conditions = this.data.lineList[i].conditions
              // console.log(this.data.lineList[i].conditions)
            }
          }
          // console.log(originalEvent);
          this.activeElement.type = 'line'
          this.activeElement.sourceId = conn.sourceId
          this.activeElement.targetId = conn.targetId
          this.$refs.nodeForm.lineInit({
            from: conn.sourceId,
            to: conn.targetId,
            label: conn.getLabel(),
            id: lineid,
            conditions: conditions
          })
        })
        // 连线
        this.jsPlumb.bind('connection', evt => {
          const from = evt.source.id
          const to = evt.target.id
          if (this.loadEasyFlowFinish) {
            this.data.lineList.push({ from: from, to: to })
          }
        })

        // 删除连线回调
        this.jsPlumb.bind('connectionDetached', evt => {
          this.deleteLine(evt.sourceId, evt.targetId)
        })

        // 改变线的连接节点
        this.jsPlumb.bind('connectionMoved', evt => {
          this.changeLine(evt.originalSourceId, evt.originalTargetId)
        })

        // 连线右击
        this.jsPlumb.bind('contextmenu', evt => {
          // console.log('contextmenu', evt)
        })

        // 连线
        this.jsPlumb.bind('beforeDrop', evt => {
          const from = evt.sourceId
          const to = evt.targetId

          if (from === to) {
            this.$message.error('节点不支持连接自己')
            return false
          }
          if (this.hasLine(from, to)) {
            this.$message.error('该关系已存在,不允许重复创建')
            return false
          }
          if (this.hashOppositeLine(from, to)) {
            this.$message.error('不支持两个节点之间连线回环')
            return false
          }
          var dataline = {
            fk_flow: this.flowid,
            fk_my: parseInt(from),
            fk_tonode: parseInt(to)
          }
          insert_nodeline(dataline).then(res => {
            this.$emit('getnodeid', this.flowid)
            this.$message.success('连接成功')
            return true
          })
        })

        // beforeDetach
        this.jsPlumb.bind('beforeDetach', evt => {
          // console.log('beforeDetach', evt)
        })
        this.jsPlumb.setContainer(this.$refs.efContainer)
      })
    },
    // 加载流程图
    loadEasyFlow() {
      // 初始化节点
      for (var i = 0; i < this.data.nodeList.length; i++) {
        const node = this.data.nodeList[i]
        // 设置源点，可以拖出线连接其他节点
        this.jsPlumb.makeSource(
          node.id,
          lodash.merge(this.jsplumbSourceOptions, {})
        )
        // // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)
        if (!node.viewOnly) {
          this.jsPlumb.draggable(node.id, {
            containment: 'parent',
            stop: function(el) {}
          })
        }
      }
      // 初始化连线
      for (var i = 0; i < this.data.lineList.length; i++) {
        const line = this.data.lineList[i]
        var connParam = {
          source: line.from,
          target: line.to,
          label: line.label ? line.label : '',
          connector: line.connector ? line.connector : '',
          anchors: line.anchors ? line.anchors : undefined,
          paintStyle: line.paintStyle ? line.paintStyle : undefined
        }
        this.jsPlumb.connect(connParam, this.jsplumbConnectOptions)
      }
      this.$nextTick(function() {
        this.loadEasyFlowFinish = true
      })
    },
    // 设置连线条件
    setLineLabel(from, to, label, conditions) {
      var conn = this.jsPlumb.getConnections({
        source: from,
        target: to
      })[0]
      if (!label || label === '') {
        conn.removeClass('flowLabel')
        conn.addClass('emptyFlowLabel')
      } else {
        conn.addClass('flowLabel')
      }
      conn.setLabel({
        label: label
      })
      var that = this // 指向问题
      this.data.lineList.forEach(function(line) {
        if (line.from === from && line.to === to) {
          line.title = label
          line.conditions = conditions // 条件

          var data = {
            id: parseInt(line.id),
            fk_flow: that.flowid,
            fk_my: parseInt(line.from),
            fk_tonode: parseInt(line.to),
            conditions: line.conditions,
            title: line.title
          }
          alter_nodeline(data).then(res => {
            that.msg('成功', '保存成功!')
            that.$emit('getnodeid', that.flowid)
          })
        }
      })
    },
    // 删除激活的元素
    deleteElement(val) {
      if (this.activeElement.type === 'node') {
        // 删除节点
        this.deleteNode(this.activeElement.nodeId, val)
      } else if (this.activeElement.type === 'line') {
        this.$confirm('确定删除所点击的线吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            for (var i = 0; i < this.data.lineList.length; i++) {
              if (
                this.data.lineList[i].from == val.from &&
                this.data.lineList[i].to == val.to
              ) {
                // 如果是 前台展示的线
                //  cons ole.log(this.data.lineList[i])
                if (this.data.lineList[i].id == undefined) {
                  this.$emit('getnodeid', this.flowid)
                  break
                }

                del_nodeline({ id: this.data.lineList[i].id }).then(res => {
                  this.msg('成功', '删除成功!')
                  this.$emit('getnodeid', this.flowid)
                })
              }
            }
            var conn = this.jsPlumb.getConnections({
              source: this.activeElement.sourceId,
              target: this.activeElement.targetId
            })[0]
            this.jsPlumb.deleteConnection(conn)
          })
          .catch(() => {})
      }
    },
    // 删除线
    deleteLine(from, to) {
      this.data.lineList = this.data.lineList.filter(function(line) {
        if (line.from == from && line.to == to) {
          return false
        }
        return true
      })
    },
    // 改变连线
    changeLine(oldFrom, oldTo) {
      this.deleteLine(oldFrom, oldTo)
    },
    // 改变节点的位置
    changeNodeSite(data) {
      for (var i = 0; i < this.data.nodeList.length; i++) {
        const node = this.data.nodeList[i]
        if (node.id === data.nodeId) {
          node.left = data.left
          node.top = data.top
        }
      }
    },
    /**
     * 拖拽结束后添加新的节点
     * @param evt
     * @param nodeMenu 被添加的节点对象
     * @param mousePosition 鼠标拖拽结束的坐标
     */
    addNode(evt, nodeMenu, mousePosition) {
      // 判断 选择流程  才可以添加节点
      if (this.data.nodeList == undefined) {
        this.$message({
          message: '请选择具体流程!',
          type: 'warning'
        })
        return
      }
      var screenX = evt.originalEvent.clientX
      var screenY = evt.originalEvent.clientY
      const efContainer = this.$refs.efContainer
      var containerRect = efContainer.getBoundingClientRect()
      var left = screenX
      var top = screenY
      // 计算是否拖入到容器中
      if (
        left < containerRect.x ||
        left > containerRect.width + containerRect.x ||
        top < containerRect.y ||
        containerRect.y > containerRect.y + containerRect.height
      ) {
        this.$message.error('请把节点拖入到画布中')
        return
      }
      if (this.data.nodeList.length != 0) {
        for (var i = 0; i < this.data.nodeList.length; i++) {
          if (this.data.nodeList[i].type == '发起') {
            if (nodeMenu.type == '发起') {
              this.$message({
                message: '已有开始节点存在!',
                type: 'warning'
              })
              return
            }
          } else if (this.data.nodeList[i].type == '结束') {
            if (nodeMenu.type == '结束') {
              this.$message({
                message: '已有结束节点存在!',
                type: 'warning'
              })
              return
            }
          }
        }
      } else {
        if (nodeMenu.type != '发起') {
          this.$message({
            message: '请选择开始节点!',
            type: 'warning'
          })
          return
        }
      }
      // console.log(this.data);

      left = left - containerRect.x + efContainer.scrollLeft
      top = top - containerRect.y + efContainer.scrollTop
      // 居中
      left -= 85
      top -= 16
      var nodeId = this.getUUID()
      // 动态生成名字
      var origName = nodeMenu.name
      var nodeName = origName
      var index = 1

      while (index < 10000) {
        var repeat = false
        for (var i = 0; i < this.data.nodeList.length; i++) {
          const node = this.data.nodeList[i]
          if (node.name === nodeName) {
            nodeName = origName + index
            repeat = true
          }
        }
        if (repeat) {
          index++
          continue
        }
        break
      }

      var node = {
        id: nodeId,
        name: nodeName,
        type: nodeMenu.type,
        left: left + 'px',
        top: top + 'px',
        ico: nodeMenu.ico,
        icoid: nodeMenu.icoid,
        state: ''
      }

      const nodedata = {
        name: nodeName,
        task: nodeMenu.type,
        coordinates_x: left + 'px',
        coordinates_y: top + 'px',
        fk_flow: this.flowid,
        fk_icon: nodeMenu.icoid,
        remark: '',
        process_way: '0',
        outside: '0',
        style: ''
      }
      insert_node(nodedata).then(res => {
        if (res.code > 0) {
          this.$emit('getnodeid', this.flowid)
          this.$notify({
            title: '成功',
            message: '节点创建成功',
            type: 'success'
          })
        } else if (res.code === 101) console.log('参数无效')
        else if (res.code === 102) console.log('参数为空')
        else if (res.code === -1) console.log('请求失败')
      })
      /**
       * 这里可以进行业务判断、是否能够添加该节点
       */
      this.data.nodeList.push(node)
      this.$nextTick(function() {
        this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions)
        this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions)
        this.jsPlumb.draggable(nodeId, {
          containment: 'parent',
          stop: function(el) {}
        })
      })
    },
    /**
     * 删除节点
     * @param nodeId 被删除节点的ID
     */
    deleteNode(nodeId, node) {
      this.$confirm('确定要删除节点' + node.name + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          /**
           * 这里需要进行业务判断，是否可以删除
           */
          this.data.nodeList = this.data.nodeList.filter(function(node) {
            if (node.id === nodeId) {
              // 伪删除，将节点隐藏，否则会导致位置错位
              // node.show = false
              return false
            }
            return true
          })
          this.$nextTick(function() {
            this.jsPlumb.removeAllEndpoints(nodeId)
          })
          if (isNaN(nodeId) == true) {
            return
          }
          del_node({ id: parseInt(nodeId) }).then(res => {
            this.msg('成功', '删除成功!')
            this.$emit('getnodeid', this.flowid)
          })
        })
        .catch(() => {})
      return true
    },
    // 点击
    clickNode(nodeId) {
      this.activeElement.type = 'node'
      this.activeElement.nodeId = nodeId.id
      var data = {
        id: parseInt(nodeId.id),
        name: nodeId.name,
        task: nodeId.task,
        fk_icon: nodeId.icoid,
        coordinates_x: nodeId.left,
        coordinates_y: nodeId.top,
        fk_flow: this.flowid,
        mnode_binding: nodeId.mnode_binding
      }

      // alter_flownode(data).then((res) => {
      //   //  this.$emit("getnodeid",this.flowid)
      //   this.msg('成功', '修改成功!')
      // })
      this.$refs.nodeForm.nodeInit(this.data, nodeId.id)
    },
    // 是否具有该线
    hasLine(from, to) {
      for (var i = 0; i < this.data.lineList.length; i++) {
        var line = this.data.lineList[i]
        if (line.from === from && line.to === to) {
          return true
        }
      }
      return false
    },
    // 是否含有相反的线
    hashOppositeLine(from, to) {
      return this.hasLine(to, from)
    },
    nodeRightMenu(nodeId, evt) {
      this.menu.show = true
      this.menu.curNodeId = nodeId
      this.menu.left = evt.x + 'px'
      this.menu.top = evt.y + 'px'
    },
    repaintEverything() {
      this.jsPlumb.repaint()
    },
    // 流程数据信息
    dataInfo() {
      this.flowInfoVisible = true
      this.$nextTick(function() {
        this.$refs.flowInfo.init()
      })
    },
    // 加载流程图
    dataReload(data) {
      this.flowid = data.id
      this.$refs.nodeForm.nodedata = data // 向form传入数据
      this.easyFlowVisible = false
      this.data.nodeList = []
      this.data.lineList = []
      this.$nextTick(() => {
        data = lodash.cloneDeep(data)
        this.easyFlowVisible = true
        if (data == {}) {
          return
        }
        this.data = data
        this.$nextTick(() => {
          this.jsPlumb = jsPlumb.getInstance()
          this.$nextTick(() => {
            this.jsPlumbInit()
          })
        })
      })
    },
    // 接收传入的流程id
    getflowid(id) {
      this.flowid = id
    },

    zoomAdd() {
      if (this.zoom >= 1) {
        return
      }
      this.zoom = this.zoom + 0.1
      this.$refs.efContainer.style.transform = `scale(${this.zoom})`
      this.jsPlumb.setZoom(this.zoom)
    },
    zoomSub() {
      if (this.zoom <= 0) {
        return
      }
      this.zoom = this.zoom - 0.1
      this.$refs.efContainer.style.transform = `scale(${this.zoom})`
      this.jsPlumb.setZoom(this.zoom)
    },
    // 下载数据
    downloadData() {
      this.$confirm('确定要下载该流程数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          var datastr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(this.data, null, '\t'))
          var downloadAnchorNode = document.createElement('a')
          downloadAnchorNode.setAttribute('href', datastr)
          downloadAnchorNode.setAttribute('download', 'data.json')
          downloadAnchorNode.click()
          downloadAnchorNode.remove()
          this.$message.success('正在下载中,请稍后...')
        })
        .catch(() => {})
    },
    openHelp() {
      this.flowHelpVisible = true
      this.$nextTick(function() {
        this.$refs.flowHelp.init()
      })
    }
  }
}
</script>
