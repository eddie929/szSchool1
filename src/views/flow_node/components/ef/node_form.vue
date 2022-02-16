<template>
  <div>
    <div class="ef-node-form">
      <div class="ef-node-form-header">节点详细信息</div>
      <div class="ef-node-form-body" style="padding-left: 10px">
        <el-form
          v-show="type === 'node'"
          ref="dataForm"
          :model="node"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="类型">
            <el-input v-model="node.type" :disabled="true" />
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="node.name" />
          </el-form-item>
          <el-form-item v-if="false" label="left坐标">
            <el-input v-model="node.left" :disabled="true" />
          </el-form-item>
          <el-form-item v-if="false" label="top坐标">
            <el-input v-model="node.top" :disabled="true" />
          </el-form-item>

          <el-form-item label="图标">
            <selecticon
              ref="selecticon"
              typename="node_form"
              @bindingicon="bindingicon"
            />
          </el-form-item>

          <!-- <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, name) in icon_option"
                :key="name"
                :icon="item.name"
                :command="item"
              >{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu> -->

          <!-- <el-form-item label="图标">
            <el-input v-model="node.ico" style="" disabled />
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link" style="color: #409eff">
                选择<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, name) in icon_option"
                  :key="name"
                  :icon="item.name"
                  :command="item"
                >{{ item.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item> -->
          <el-form-item label="用户/角色">
            <el-input
              ref="inputUsers"
              v-model="inputUsersValue"
              placeholder="请选择"
              @focus="selectUsers"
              @input="updateView($event)"
            />
          </el-form-item>

          <el-form-item label="处理方式">
            <el-radio
              v-model="process_way"
              label="0"
              @change="processradio"
            >单个操作</el-radio>
            <el-radio
              v-model="process_way"
              label="1"
              @change="processradio"
            >全部操作</el-radio>
          </el-form-item>

          <el-form-item label="处理范围">
            <el-radio
              v-model="outside"
              label="0"
              @change="outsideradio"
            >内部处理</el-radio>
            <el-radio
              v-model="outside"
              label="1"
              @change="outsideradio"
            >外部处理</el-radio>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-check"
              size="small"
              @click="save"
            >保存</el-button>
            <el-button
              icon="el-icon-close"
              type="danger"

              size="small"
              @click="deletenode"
            >删除</el-button>

          </el-form-item>
        </el-form>

        <el-form
          v-show="type === 'line'"
          ref="dataForm"
          :model="line"
          label-width="80px"
        >
          <el-form-item label="标题">
            <el-input v-model="line.label" />
          </el-form-item>
          <el-form-item label="条件">
            <el-input v-model="line.conditions" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-check"
              size="small"
              @click="saveLine"
            >保存</el-button>
            <el-button
              icon="el-icon-close"
              type="danger"
              size="small"
              @click="deleteline"
            >删除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <selectnodeuser
      ref="selectnodeuser"
      :usertablerow.sync="userTableRow"
      :roletablerow.sync="roleTableRow"
      @allTableRowWay="allTableRowWay"
    />
  </div>
</template>

<script>
import selectnodeuser from '../selectnodeuser/index.vue'
import { cloneDeep } from 'lodash'
import selecticon from '@/bitcomponents/selecticon/index'
export default {
  name: 'Nodeform',
  components: { selectnodeuser, selecticon },
  data() {
    return {
      visible: true,
      type: 'node',
      inputUsersValue: '',
      process_way: '0', // 处理方式
      outside: '0', // 内外部
      line: {},
      nodedata: {},
      node: {},
      // 绑定 信息
      bindingList: {
        fk_user: '', // 节点绑定--绑定用户
        user_name: '', // 节点绑定--绑定用户
        fk_role: '', // 节点绑定--绑定角色id
        role_name: '', // 节点绑定--绑定角色name
        fk_flow: 0, // 流程id
        fk_node: 0, // 节点id
        binding_type: '' // 绑定类型
      },
      // 节点状态
      stateList: [
        {
          state: 'success',
          label: '成功'
        },
        {
          state: 'warning',
          label: '警告'
        },
        {
          state: 'error',
          label: '错误'
        },
        {
          state: 'running',
          label: '运行中'
        }
      ],
      userTableRow: [], // 绑定的用户
      roleTableRow: [], // 绑定的角色
      allTableRow: '' // 选择全部
    }
  },
  watch: {
    userTableRow: {
      handler(newValue, oldValue) {
        // id分割 渲染父组件
        this.inputUsersValue = ''
        this.bindingList.user_name = ''
        this.bindingList.fk_user = ''
        this.bindingList.binding_type = '用户'
        newValue.forEach((item, index, array) => {
          this.bindingList.user_name += item.姓名 + ','
          this.bindingList.fk_user += item.id_用户 + ','
        })
        this.inputUsersValue = this.bindingList.user_name.substr(
          0,
          this.bindingList.user_name.length - 1
        )
      }
    },
    roleTableRow: {
      handler(newValue, oldValue) {
        this.inputUsersValue = ''
        this.bindingList.role_name = ''
        this.bindingList.fk_role = ''
        this.bindingList.binding_type = '角色'
        newValue.forEach((item, index, array) => {
          this.bindingList.role_name += item.name + ','
          this.bindingList.fk_role += item.id + ','
        })
        this.inputUsersValue = this.bindingList.role_name.substr(
          0,
          this.bindingList.role_name.length - 1
        )
      }
    }
  },

  methods: {
    /**
     * 表单修改，这里可以根据传入的ID进行业务信息获取
     * @param data
     * @param id
     */
    nodeInit(data, id) {
      this.process_way = '1' // 处理方式
      this.outside = '1' // 内外部
      this.type = 'node'
      this.nodedata = data
      data.nodeList.filter(node => {
        if (node.id === id) {
          this.node = cloneDeep(node)
          this.$refs.selecticon.icon = this.node.ico
          this.process_way = this.node.process_way
          this.outside = this.node.outside
          if (this.node.mnode_binding.binding_type === '用户') {
            this.inputUsersValue = this.node.mnode_binding.user_name
          } else if (this.node.mnode_binding.binding_type === '角色') {
            this.inputUsersValue = this.node.mnode_binding.role_name
          } else {
            // 全部
            this.bindingList = this.node.mnode_binding
            this.inputUsersValue = this.node.mnode_binding.user_name
          }
        }
      })
    },
    lineInit(line) {
      this.type = 'line'
      this.line = line
    },
    // 解决双向绑定失效
    updateView(e) {
      this.$forceUpdate()
    },
    /**
     * 获取节点绑定用户信息信息
     * @param val 绑定类型 用户 角色
     * @param row 绑定数据
     */
    // selectPut(val, row) {
    //   let sid = '' // 分隔id
    //   let sname = '' // 分隔名称

    //   // if (val !== '所有人') {
    //   //   for (var i = 0; i < row.length; i++) {
    //   //     if (val === '用户') {
    //   //       sid += row[i].id_用户 + ','
    //   //       sname += row[i].姓名 + ','
    //   //     } else if (val === '角色') {
    //   //       sid += row[i].id + ','
    //   //       sname += row[i].name + ','
    //   //     }
    //   //   }

    //   // }
    //   if (val === '角色') {
    //     for (let i = 0; i < row.length; i++) {
    //       sid += row[i].id + ','
    //       sname += row[i].name + ','
    //     }
    //     this.bindingList.fk_role = sid
    //     this.bindingList.role_name = sname
    //     this.bindingList.user_name = ''
    //     this.bindingList.fk_user = ''
    //   } else if (val === '用户') {
    //     for (let i = 0; i < row.length; i++) {
    //       sid += row[i].id_用户 + ','
    //       sname += row[i].姓名 + ','
    //     }
    //     this.bindingList.fk_user = sid
    //     this.bindingList.user_name = sname
    //     this.bindingList.role_name = ''
    //     this.bindingList.fk_role = ''
    //   } else {
    //     // 全部
    //     this.bindingList.binding_type = '全部'
    //     this.bindingList.fk_user = '全部'
    //     this.bindingList.user_name = '全部'
    //     this.bindingList.role_name = '全部'
    //     this.bindingList.fk_role = '全部'
    //   }
    //   this.bindingList.binding_type = val
    //   this.bindingList.fk_flow = this.nodedata.id
    //   sid = sid.substring(0, sid.lastIndexOf(','))
    //   sname = sname.substring(0, sname.lastIndexOf(','))
    //   this.$set(this.node, 'users', sname)
    //   this.inputUsersValue = sname
    //   // this.$refs.inputUsers.value = this.bindingList.user_name
    //   // console.log(this.bindingList)
    // },
    // 点击选择 绑定
    selectUsers() {
      if (this.nodedata.id === undefined) {
        this.$message({
          message: '请选择节点!',
          type: 'warning'
        })
        this.$refs.inputUsers.blur()
        return
      }
      this.$refs.selectnodeuser.dialoginfo_flag = true
      this.inputUsersValue = ''
      this.bindingList = {}
    },
    // 删除节点
    deletenode() {
      if (this.node.id === undefined) {
        this.$message({
          message: '请选择要删除节点!',
          type: 'warning'
        })
        return
      }
      this.$emit('deleteElement', this.node)
    },
    // 删除连线
    deleteline() {
      this.$emit('deleteElement', this.line)
    },
    // 修改连线
    saveLine() {
      this.$emit(
        'setLineLabel',
        this.line.from,
        this.line.to,
        this.line.label,
        this.line.conditions
      )
    },
    // 保存
    save() {
      try {
        this.nodedata.nodeList.filter(node => {
          if (node.id === this.node.id) {
            node.name = this.node.name
            node.left = this.node.left
            node.top = this.node.top
            node.icoid = this.node.icoid
            node.ico = this.node.ico
            node.state = this.node.state
            this.$emit('repaintEverything')
          }
        })
      } catch {
        this.$message({
          message: '请选择要保存的节点!',
          type: 'warning'
        })
        return
      }

      // // 判断有无节点没有选择图标
      // for (var i = 0; i < this.data.nodeList.length; i++) {
      //   // console.log(i,this.data.nodeList[i].users)
      //   if (this.data.nodeList[i].ico == undefined) {
      //     this.$message({
      //       message: '请选择节点(' + this.data.nodeList[i].name + ')图标!',
      //       type: 'warning'
      //     })
      //     return
      //   }
      // }

      // 判断具体哪个节点
      var i = this.nodedata.nodeList.length - 1

      // 找到最后一个节点
      // console.log(this.data.nodeList[i]);
      // 判断节点id是不是纯数字,纯数字说明修改,反之创建
      if (isNaN(this.nodedata.nodeList[i].id) === true) {
        // 保存创建
        this.$emit('nodeSave', this.nodedata.nodeList[i])
      } else {
        // 保存修改
        this.$emit('Modify', this.node, this.bindingList)
      }
    },

    // 选择图标
    bindingicon(id, name) {
      if (this.node.id === undefined) {
        this.$message({
          message: '请选择节点!',
          type: 'warning'
        })
        return
      }
      this.node.ico = name
      this.node.icoid = id
    },
    // 选择处理方式
    processradio(val) {
      this.node.process_way = val
    }, // 选择内外部
    outsideradio(val) {
      this.node.outside = val
    },
    allTableRowWay() {
      this.inputUsersValue = '全部'
      this.bindingList.role_name = '全部'
      this.bindingList.fk_role = '全部'
      this.bindingList.user_name = '全部'
      this.bindingList.fk_user = '全部'
      this.bindingList.binding_type = '全部'
    }
  }
}
</script>

<style scoped>
.el-node-form-tag {
  position: absolute;
  top: 50%;
  margin-left: -15px;
  height: 40px;
  width: 15px;
  background-color: #fbfbfb;
  border: 1px solid rgb(220, 227, 232);
  border-right: none;
  z-index: 0;
}
</style>
