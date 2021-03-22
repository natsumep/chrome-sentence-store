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
async function loadType() {
  const res = await $.get("https://www.tinker.run/api/sentence/type");
  type = res.body;
}

function initComponent() {
  if (!vm) {
    const app = document.createElement("div");
    app.id = "_sentence_app_div";
    document.body.appendChild(app);
    vm = new Vue({
      el: "#_sentence_app_div",
      data() {
        return {
          visible: false,
          radio: "sentence",
          form: {
            content: "",
            author: "",
            source: "",
          },
        };
      },
      methods: {
        handleHidden() {
          this.visible = false;
        },
        onSubmit() {
          this.$refs.form.validate((valid) => {
            if (valid) {
              const type = this.radio;
              const url = `https://www.tinker.run/api/${type}/add`;
              const data = this.form;
              $.ajax({
                type: 'POST',
                url,
                data,
                success: ()=>{

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
          >
            <div style="margin-bottom:20px;">
              <span style="width:80px;text-align: right;padding-right: 12px;display: inline-block;">上传类型</span> 
              <el-radio-group  v-model="radio">
                <el-radio label="sentence">句子杂货铺</el-radio>
                <el-radio label="caihong">彩虹屁🌈</el-radio>
              </el-radio-group>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
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

function show(val) {
  if (!token) {
    ELEMENT.Message.warning(
      "请点击右上角句子杂货铺登录后才可以上传哟~ 么么哒~"
    );
    return;
  }
  initComponent();
  vm.$data.form.content = val;
  vm.$data.visible = true;
}
