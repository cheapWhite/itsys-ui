import configApi from '@/api/sys/config'

const sys = {
	state: {
		title : '',
		version:'',
		login:'',
		company:'',
		initConfig:false,
		pageSize:20,//列表的默认页容量
		tableMaxHeight:420,//列表的默认页容量
	},
	getters: {
	},
	mutations: {
		SET_INITCONFIG( state, initConfig ) {
			state.initConfig = initConfig
		},
		SET_VERSION( state, version) {
			state.version = version
		},
		SET_LOGIN( state, login) {
			state.login = login
		},
		SET_TITLE( state, title) {
			state.title = title
		},
		SET_COMPANY( state, company) {
			state.company = company
		}
	},
	actions: {
		initSysConfig({ state,commit }, path) {
			return new Promise(( resolve, reject )=>{
				if(!state.initConfig){
					configApi.getValues(['system_title','version','login','company_name']).then(res=>{
						commit('SET_INITCONFIG',true)
						commit('SET_VERSION',res.data.version)
						commit('SET_LOGIN',res.data.login=='on'?true:false)
						commit('SET_TITLE',res.data.system_title)
						commit('SET_COMPANY',res.data.company_name)
						Cookies.set('PHPSESSID', '35646467573535646') //此处应该加上否则无法跳转成功
						resolve()
					})
				}else{
					resolve()
				}
			})
			
		}
	}
}
export default sys
