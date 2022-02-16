import { Message } from "element-ui";
export default {
    install(Vue, options) {
        // 待办处理跳转
        Vue.prototype.gotodo = (name, router) => {
            console.log(name + '123');
            if (name == "资产报修") {
                router.push({ path: "/Repair/index" });
            } else if (name == "资产借还") {
                router.push({ path: "/Borrow/index" });
            } else if (name == "原值变动") {
                router.push({ path: "/ChangeOriginal/index" });
            } else if (name == "购置验收入库") {
                // router.push({ path: "/Purchase" });
                router.push({ path: "/Purchase/index" });
            } else if (name == "资产盘点") {
                router.push({ path: "/check" });
            } else if (name == "资产报废") {
                router.push({ path: "/assetDisposal" });
            } else if (name == "资产调拨") {
                router.push({ path: "/assetDisposal" });
            } else if (name == "资产转移") {
                router.push({ path: "/Transfer/index" });
            } else if (name == "待办中心") {
                router.push({ path: "/Disposal/index" });
            } else if (name == "异常资产") {
                router.push({ path: "/abnormal/index" });
            } else if (name == "临界到期") {
                router.push({ path: "/Critical/index" });
            } else if (name == "资产处置") {
                router.push({ path: "/assetDisposal" });
            }
        };
    }
};