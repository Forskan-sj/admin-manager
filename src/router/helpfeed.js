import Layout from '@/views/layout/Layout'

const helpfeed = {
  path: '/helpfeed',
  component: Layout,
  redirect: '/helpfeed/feedback/index',
  name: 'HelpFeed',
  meta: {
    title: '帮助反馈',
    icon: 'example'
  },
  children: [{
    path: 'feedback',
    name: 'FeedBack',
    component: () =>
      import('@/views/feedback/list'),
    redirect: '/helpfeed/feedback/index',
    meta: {
      title: '反馈信息',
      icon: 'form'
    },
    children: [{
      path: 'index',
      name: 'FeedbackList',
      component: () =>
        import('@/views/feedback/list'),
      meta: {
        title: '反馈信息',
        icon: 'form'
      }
    }]
  },
  {
    path: 'feedback',
    name: 'FeedBackEdits',
    component: () =>
      import('@/views/feedback/options'),
    redirect: '/helpfeed/feedback/index',
    meta: {
      title: '反馈信息',
      icon: 'form'
    },
    hidden: true,
    children: [
    {
      path: 'options/:id(\\d+)',
      name: 'FeedBackEdit',
      component: () =>
        import('@/views/feedback/options'),
      meta: {
        title: '处理反馈',
        icon: 'form'
      }
    }]
  },
  {
    path: 'feedbacks',
    name: 'HelpLists',
    component: () =>
      import('@/views/feedback/qlist'),
    redirect: '/helpfeed/feedbacks/index',
    meta: {
      title: '常见问题',
      icon: 'form'
    },
    children: [{
      path: 'index',
      name: 'HelpList',
      component: () =>
        import('@/views/feedback/qlist'),
      meta: {
        title: '常见问题',
        icon: 'form'
      }
    }]
  },
  {
    path: 'feedbacks',
    name: 'HelpEdits',
    component: () =>
      import('@/views/feedback/qoption'),
    redirect: '/helpfeed/feedbacks/index',
    meta: {
      title: '常见问题',
      icon: 'form'
    },
    hidden: true,
    children: [
    {
      path: 'options/:id(\\d+)',
      name: 'HelpEdit',
      component: () =>
        import('@/views/feedback/qoption'),
      meta: {
        title: '问题编辑',
        icon: 'form'
      }
    }]
  }]
}
export default helpfeed
