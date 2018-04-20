<template>
    <form id="f-signUp" @submit.prevent="signUp">
        <div class="s-input-box">
            <input type="text" class="input" v-model="user.phone" placeholder="请输入手机号"/>
        </div>
        <div class="s-input-box">
            <div class="box-captcha" id="popup-submit">
                <img src="img/geetest.png"/>
            </div>
        </div>
        <div class="s-input-box">
            <input type="text" class="input yzm-input" placeholder="请输入验证码"/>
            <a class="btn yzm-btn" href="javascript:yzmbtn();">获取验证码</a>
        </div>
        <div class="s-input-box">
            <input type="password" class="input" v-model="user.psw" placeholder="请输入密码"/>
        </div>
        <div class="s-input-box">
            <input type="password" class="input" v-model="user.repsw" placeholder="请再次输入密码"/>
        </div>
        <div class="s-input-box">
            <div class="checkbox">
                <label>
                    <input type="checkbox" checked="checked" name="agree" id="agree">
                    <i></i>同意《
                    <a class="href" href="#statement" data-toggle="modal">云客法律声明及隐私权保护协议</a>
                    》</label>
            </div>
        </div>
        <div class="s-input-box">
            <input type="submit" class="btn btn-primary signUp-submit" value="下一步" data-toggle="modal"/>
        </div>
    </form>
</template>
<script>
Vue.extend({
  data: {
    user: {
      phone: '',
      psw: '',
      repsw: '',
    },
  },
  methods: {
    signUp: function() {
      if (this.user.phone.trim() == '') {
        // alert("", "请输入手机号");
        toastr.success('请输入手机号');
        return false;
      }
      if (this.user.psw.trim() == '') {
        toastr.success('请输入密码');

        // alert('', '请输入密码');
        return false;
      }
      if (this.user.repsw == '') {
        toastr.success('请再次输入密码');

        // alert('', '请再次输入密码');
        return false;
      }
    },
  },
});
</script>