chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { type, info, tab } = request;
  if (type === "upload") {
    show(info.selectionText);
    sendResponse("我是后台，我已收到你的消息：" + JSON.stringify(request));
  }
});
let vm = null;
let type = [];
// let token = null;
async function loadType () {
  const res = await $.get("https://www.tinker.run/api/sentence/type");
  type = res.body;
}

async function initComponent () {
  if (!vm) {
    await loadType()
    const app = document.createElement("div");
    app.id = "_sentence_app_div";
    document.body.appendChild(app);
    vm = new Vue({
      el: "#_sentence_app_div",
      data () {
        return {
          visible: false,
          radio: "sentence",
          type,
          form: {
            content: "",
            author: "",
            source: "",
            typeId: "",
          },
        };
      },
      methods: {
        handleHidden () {
          this.visible = false;
        },
        hanldeDialogClose () {
          this.form = {
            content: "",
            author: "",
            source: "",
            typeId: "",
          }
        },
        onSubmit () {
          this.$refs.form.validate((valid) => {
            if (valid) {
              const type = this.radio;
              const url = `https://www.tinker.run/api/${type}/add`;
              const data = this.form;
              const _this = this;
              $.ajax({
                type: 'POST',
                url,
                data,
                success: (data) => {
                  const { status,msg } = data;
                  if(status === 200){
                    ELEMENT.Message.success("上传成功，么么哒~")
                    _this.visible = false;
                  }else if(status>=600){
                    ELEMENT.Message.warning(msg || "上传失败~~")
                  }else{
                    ELEMENT.Message.warning("服务器异常，上传失败~~")
                  }
                },
                error:()=>{
                  console.log(this)
                },
                headers: {
                  authorization: "Bearer " + token,
                  [`content-type`]: `application/x-www-form-urlencoded`
                },
              });
            } else {
              return false;
            }
          });
        },
      },
      template: `
        <div class="_sentent-dialog">
          <el-dialog  
            width="28%" 
            :close-on-click-modal="false" 
            :close-on-press-escape="false"
            :lock-scroll='false' 
            :modal-append-to-body="false" 
            :fullscreen='false' 
            :modal="false" 
            :visible.sync="visible" 
            title="上传句子到杂货铺"
            @close="hanldeDialogClose"
          >
            <div style="margin-bottom:20px;display:flex;">
              <span style="width:80px;text-align: right;padding-right: 12px;display: inline-block;box-sizing: border-box;">上传类型</span> 
              <el-radio-group  v-model="radio">
                <el-radio label="sentence">句子杂货铺</el-radio>
                <el-radio label="caihong">彩虹屁🌈</el-radio>
              </el-radio-group>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
            <el-form-item 
              :rules="[
                { required: true, message: '请选择句子类型', trigger: ['blur', 'change'] }
              ]"
              v-if="radio==='sentence'" label="句子类型"
              prop="typeId"
            >
            <el-select v-model="form.typeId" placeholder="请选择句子类型">
              <el-option
                v-for="item in type"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item 
              :rules="[
                { required: true, message: '请输入句子作者', trigger: ['blur', 'change'] }
              ]"
              v-if="radio==='sentence'" label="句子作者"
              prop="author"
            >
              <el-input placeholder="请输入句子作者" v-model="form.author" maxlength="50" ></el-input>
            </el-form-item>
            <el-form-item v-if="radio==='sentence'"
              prop="source"
              :rules="[
                { required: true, message: '请输入句子出处', trigger: ['blur', 'change'] }
              ]"
              label="句子出处"
            >
              <el-input placeholder="请输入句子出处" v-model="form.source" maxlength="50" prop="source" ></el-input>
            </el-form-item>
            <el-form-item 
              prop="content"
              label="句子内容" 
              :rules="[{ required: true, message: '请输入句子内容', trigger: ['blur', 'change'] }]"
            >
              <el-input 
                v-model="form.content"
                type="textarea"
                placeholder="请输入句子内容"
                :autosize="{ minRows: 3, maxRows: 8 }"
                maxlength="150"
                prop="content"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">上传</el-button>
              <el-button @click="handleHidden">取消</el-button>
            </el-form-item>
           </el-form>
          </el-dialog>
        </div>`,
    });
    $(document.querySelector("._sentent-dialog .el-dialog")).draggabilly({
      handle: ".el-dialog__header",
    });
  }
}

async function  show (val) {
  if (!token) {
    ELEMENT.Message.warning(
      "请点击右上角句子杂货铺登录后才可以上传哟~ 么么哒~"
    );
    return;
  }
  await initComponent();
  vm.$data.form.content = val;
  vm.$data.visible = true;
}
