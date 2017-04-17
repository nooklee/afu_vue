import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
// const personal_center = r => require.ensure([], () => r(require('../page/home/home')), 'home')


export default [{
    path: '/',
    component: App,
    children: [
    	{
            path: '',
            redirect: '/home',
            meta: { title: '首页' }
        },
        {
            path: '/home',
            component: home,
            meta: { title: '首页' }
        }
    ]
}]