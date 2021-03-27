chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { type, info, tab } = request;
  if (type === "upload") {
    console.log("收到上传消息")
    show(info.selectionText);
    sendResponse("我是后台，我已收到你的消息：" + JSON.stringify(request));
  }
});
let vm = null;
let type = [];
// let token = null;
async function loadType () {
  let res = [];
  try{
    const res = await $.get("https://www.tinker.run/api/sentence/type");
    type = res.body;
  }catch(e){
    type =[{"id":1,"name":"原创"},{"id":2,"name":"诗词"},{"id":3,"name":"影视"},{"id":4,"name":"动画"},{"id":5,"name":"漫画"},{"id":6,"name":"游戏"},{"id":7,"name":"文学"},{"id":8,"name":"网络"},{"id":9,"name":"网易云"},{"id":10,"name":"哲学"},{"id":11,"name":"歌词"},{"id":100,"name":"其他"}]
  }
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
          formReport:{
            type:"",
            content:"",

          },
          sententce:"",
          sententceId:"",
          sententceType:"",
          visibleReport: false,
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
        onSubmitReport(){
          this.$refs.formReport.validate((valid) => {
            if (valid) {
              const type = this.sententceType;
              // const url = `https://www.tinker.run/api/${type}/add`;
              const url = `http://127.0.0.1:8088/api/${type}/report`;
              const data = this.formReport;
              data.sententceType = this.sententceType;
              data.sententceId = this.sententceId;
              console.log(data);
              return 
              const _this = this;
              $.ajax({
                type: 'POST',
                url,
                data,
                success: (data) => {
                  const { status,msg } = data;
                  if(status === 200){
                    ELEMENT.Message.success("上传成功，么么哒~")
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
        hanldeDialogReportClose(){
          this.formReport = {
            type:"",
            content:"",

          }
        },
        handleHiddenReport(){
          this.visibleReport= false;
        },
        onSubmit () {
          this.$refs.form.validate((valid) => {
            if (valid) {
              const type = this.radio;
              // const url = `https://www.tinker.run/api/${type}/add`;
              const url = `http://127.0.0.1:8088/api/${type}/add`;

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
            width="30%" 
            :close-on-click-modal="false" 
            :close-on-press-escape="false"
            :lock-scroll='false' 
            :modal-append-to-body="false" 
            :fullscreen='false' 
            :modal="false" 
            :visible.sync="visible" 
            :center="false"
            title="上传句子到杂货铺"
            @close="hanldeDialogClose"
          >
            <div style="margin-bottom:20px;display:flex;">
              <span style="width:100px;text-align: right;padding-right: 12px;display: inline-block;box-sizing: border-box;">上传类型</span> 
              <el-radio-group  v-model="radio">
                <el-radio label="sentence">句子杂货铺</el-radio>
                <el-radio label="caihong">彩虹屁🌈</el-radio>
              </el-radio-group>
            </div>
            <el-form ref="form" :model="form" label-width="100px">
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
              v-if="radio==='sentence'" label="句子作者"
              prop="author"
            >
              <el-input placeholder="请输入句子作者,据不完全统计，存在句子作者更有利于通过审核" v-model="form.author" show-word-limit maxlength="50" ></el-input>
            </el-form-item>
            <el-form-item v-if="radio==='sentence'"
              prop="source"
              label="句子出处"
            >
              <el-input placeholder="请输入句子出处,据不完全统计，存在句子出处更有利于通过审核" v-model="form.source" show-word-limit maxlength="50" prop="source" ></el-input>
            </el-form-item>
            <el-form-item 
              prop="content"
              label="句子内容" 
              :rules="[{ required: true, message: '请输入句子内容', trigger: ['blur', 'change'] }]"
            >
              <el-input 
                v-model="form.content"
                type="textarea"
                show-word-limit
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
          <el-dialog  
            width="28%" 
            :close-on-click-modal="false" 
            :close-on-press-escape="false"
            :lock-scroll='false' 
            :modal-append-to-body="false" 
            :fullscreen='false' 
            :modal="false" 
            :visible.sync="visibleReport" 
            title="审核当前句子"
            @close="hanldeDialogReportClose"
          >
            <div style="margin-bottom:15px;"><span style="width:100px;text-align: right;padding-right: 12px;display: inline-block;box-sizing: border-box;">句子内容</span>  {{sententce}} </div>
            <el-form ref="formReport" :model="formReport" label-width="100px">
            <el-form-item 
              :rules="[
                { required: true, message: '请选择审核类型', trigger: ['blur', 'change'] }
              ]"
               label="审核类型"
              prop="type"
            >
            <div>
              <el-radio v-model="formReport.type" label="谩骂攻击" border>谩骂攻击</el-radio>
              <el-radio v-model="formReport.type" label="反动违法" border>反动违法</el-radio>
              <el-radio v-model="formReport.type" label="色情低俗" border>色情低俗</el-radio>
              <el-radio v-model="formReport.type" label="营销广告" border>营销广告</el-radio>
              <el-radio v-model="formReport.type" label="作者不对" border>作者不对</el-radio>
              <el-radio v-model="formReport.type" label="来源不对" border>来源不对</el-radio>
              <el-radio v-model="formReport.type" label="类型不对" border>类型不对</el-radio>
              <el-radio v-model="formReport.type" label="其他" border>其他</el-radio>
            </div>
            </el-form-item>
            <el-form-item 
              prop="content"
              label="审核内容" 
            >
              <el-input 
                v-model="formReport.content"
                type="textarea"
                show-word-limit
                placeholder="请输入审核内容"
                :autosize="{ minRows: 3, maxRows: 8 }"
                maxlength="150"
                prop="content"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitReport">提交</el-button>
              <el-button @click="handleHiddenReport">取消</el-button>
            </el-form-item>
           </el-form>
          </el-dialog>

        </div>`,
    });
    document.querySelectorAll("._sentent-dialog .el-dialog").forEach(function(item){
      $(item).draggabilly({
        handle: ".el-dialog__header",
      });
    })
   
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

async function showReport(option){
  if (!token) {
    ELEMENT.Message.warning(
      "请点击右上角句子杂货铺登录后才可以上传争议内容哟~ 么么哒~"
    );
    return;
  }
  await initComponent();
  const { sententce,sententceId,sententceType} = option;
  vm.$data.sententce = sententce;
  vm.$data.sententceId = sententceId;
  vm.$data.sententceType = sententceType;
  vm.$data.visibleReport = true;
}
