import axios from 'axios'

// axios 配置 config.js
//axios.defaults.timeout = 5000;
//axios.defaults.baseURL = 'https://api.github.com';
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(
  config => {
    /*
        if ($.cookie("token")) {
            config.headers._token = $.cookie("token");
        }
        */
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    /*
        if (response.data.code == 2) {
            window.location.href = "/#/login";
            $.cookie("user", null);
            $.cookie("token", null);
            return "";
        } else {
            return response;
        }
        */
    return response;
  },
  error => {
    /*
        if (error.response) {
            switch (error.response.status) {
                case 401:
  // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login'
                      //query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        */
    return Promise.reject(error.response.data)
  });

export default axios;
