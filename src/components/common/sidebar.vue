<template>
    <div class="sidebar_out_box">
        <span @click="toggleSideBar(true);" class="sidebar_btn"></span>
        <div class="sidebar_box" v-bind:class="{ show: isShow }" @click.self="isShow = !isShow;">
            <div class="sidebar_hover" @click.self="toggleSideBar(false);"></div>
            <div class="sidebar_content">
                <!-- <div class="sidebar_bg"></div> -->
                <div class="sidebar">
                    <doctor-info-banner :canEdit="canEdit"></doctor-info-banner>
                    <ul class="sidebar_menu" id="sidebarMenu">
                        <li v-for="item in sidebarMenu" v-bind:class="{ active: item.isActive }">

                            <template v-if="item.isLink">
                                <i class="item_icon" :style="'background-image: url(' + item.icon + ');'"></i><span @click.self="handleLink(item.to);">{{item.itemName}}</span><span v-if="item.tip" class="item_tip">{{item.tip}}</span>
                            </template>

                            <template v-else>
                                <i class="item_icon" :style="'background-image: url(' + item.icon + ');'"></i><span @click.self="item.isActive = !item.isActive;item.icon = item.isActive ? item.activeIcon : item.noIcon">{{item.itemName}}</span>
                                <ul class="sidebar_sub_menu">
                                    <li v-for="subItem in item.subList"><i class="item_icon" :style="'background-image: url(' + item.icon + ');'"></i><span @click="handleLink(subItem.to)">{{subItem.itemName}}</span></li>
                                </ul>
                            </template>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import doctorInfoBanner from '../../components/common/doctor_info_banner.vue';

export default {
    name: 'sidebar',
    mounted() {
        // 做一些样式的初始化
        $('#sidebarMenu').css('height', $(window).height() - $('#doctorInfoBannerBox').outerHeight(true));
    },
    data() {
        return {
            isShow: false,
            canEdit: true,
            sidebarMenu: [
                {
                    itemName: '日历查看',
                    to: '/calendar',
                    isActive: false,
                    icon: require('../../images/calendar_icon.png'),
                    isLink: true
                },
                {
                    itemName: '我的人脉',
                    to: '/calendars',
                    isActive: false,
                    icon: require('../../images/connection_icon.png'),
                    isLink: true
                },
                {
                    itemName: '我的诊所',
                    isLink: false,
                    isActive: false,
                    icon: require('../../images/clinic_icon.png'),
                    noIcon: require('../../images/clinic_icon.png'),
                    activeIcon: require('../../images/clinic_active_icon.png'),
                    subList: [
                        {
                            itemName: '我的病历',
                            to: '/calendars',
                            isLink: true
                        },
                        {
                            itemName: '我的留言',
                            to: '/calendars',
                            isLink: true
                        },
                        {
                            itemName: '我的钱包',
                            to: '/calendars',
                            isLink: true
                        },
                        {
                            itemName: '我的管理',
                            to: '/calendars',
                            isLink: true
                        },
                    ]
                },
                {
                    itemName: '系统消息',
                    to: '/calendars',
                    isActive: false,
                    tip: 5,
                    icon: require('../../images/sys_msg_icon.png'),
                    isLink: true
                },
                {
                    itemName: '意见反馈',
                    to: '/calendars',
                    isActive: false,
                    icon: require('../../images/suggess_icon.png'),
                    isLink: true
                },
            ],
            isAnimating: false,
            isOpen: false
        }
    },
    components: {
        doctorInfoBanner
    },
    methods: {
        toggleSideBar(msg) {
            this.isShow = !this.isShow;
            this.$store.commit('TOGGLE_SIDEBAR', {spreadSidebar: msg})
        },
        handleLink(src) {
            this.toggleSideBar(false);
            this.$router.push(src);
        }
    },
}
</script>

<style scoped>

    .sidebar_out_box {
        position: absolute;
    }

    .sidebar_btn {
        position: absolute;
        width: 0.773rem;
        height: 0.773rem;
        left: 1.237rem;
        top: .85rem;
        background: url('../../images/sidebar_more_icon.png') center no-repeat;
        background-size: 100% auto;
    }

    .sidebar_box {
        position: fixed;
        width: 100%;
        height: 100%;
        left: -100%;
        top: 0;
        z-index: 1000;
        transition: left 0s .32s;
    }

    .sidebar_box.show {
        transition: left 0s;
        left: 0;
    }

    .sidebar_hover {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        transition: opacity .32s;
        background: rgba(0, 0, 0, .4);
        opacity: 0;
    }

    .sidebar_box.show .sidebar_hover {
        opacity: 1;
    }

    .sidebar_content {
        position: absolute;
        width: 66%;
        height: 100%;
        left: -100%;
        top: 0;
        transition: left .32s;
    }

    .sidebar_box.show .sidebar_content {
        left: 0;
        transition: left 0;
    }

    .sidebar {
        position: absolute;
        left: -100%;
        top: 0;
        background: #fff;
        z-index: 2;
        transition: left .32s;
        width: 100%;
        min-height: 100%;
    }

    .sidebar_box.show .sidebar {
        left: 0;
    }

    .sidebar_bg {
        position: absolute;
        left: -100%;
        top: 50%;
        height: 150%;
        width: 80%;
        background: #fff;
        transform: translateY(-50%);
        transition: left .32s;
    }

    .sidebar_box.show .sidebar_bg {
        left: 0;
        animation: flexible_animate .8s cubic-bezier(.2, 0, .4, 1);
    }

    .sidebar_menu {
        text-align: center;
        padding-top: 0.58rem;
        padding-bottom: 0.58rem;
        line-height: 1.932rem;
        overflow: auto;
        box-sizing: border-box;
    }

    .sidebar_menu>li {
        position: relative;
    }

    .sidebar_sub_menu {
        background: #74cbd9;
    }

    .sidebar_sub_menu li:nth-child(even) {
        background: #83d0dc;
    }

    .sidebar_sub_menu li {
        height: 0px;
        transition: height .32s;
        overflow: hidden;
    }

    .sidebar_menu li.active {
        background: #66c6d5;
        color: #fff;
    }

    .sidebar_menu li.active .sidebar_sub_menu li {
        height: 1.932rem;
    }

    .sidebar_menu span,
    .sidebar_menu a {
        display: inline-block;
        vertical-align: middle;
    }

    .sidebar_menu .item_icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('../../images/calendar_icon.png') center no-repeat;
        background-size: 100% auto;
        vertical-align: middle;
        margin-right: 10px;
    }

    .sidebar_menu .item_tip {
        position: absolute;
        right: 20%;
        top: 50%;
        transform: translateY(-50%);
        background: #f29b5a;
        color: #fff;
        border-radius: 100px;
        min-width: 12px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        padding: 2px 4px;
    }

    @keyframes flexible_animate {
        0% {
            border-top-right-radius: 1000px;
            border-bottom-right-radius: 1000px;
            left: -100%;
        }
        30% {
            border-top-right-radius: 1000px;
            border-bottom-right-radius: 1000px;
            left: -35%;
        }
        60% {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            left: 0;
        }
        70% {
            border-top-right-radius: 60%;
            border-bottom-right-radius: 60%;
        }
        to {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            left: 0;
        }
    }

</style>
