import Layout from '@/views/layout/Layout'

const lib = {
  path: '/lib',
  component: Layout,
  redirect: '/lib/books/index',
  name: 'Lib',
  meta: {
    title: '图书馆管理',
    icon: 'example'
  },
  children: [{
    path: 'books',
    name: 'Bookpage',
    component: () =>
      import('@/views/lib/books/list'),
    redirect: '/lib/books/index',
    meta: {
      title: '书籍管理',
      icon: 'form'
    },
    children: [{
      path: 'index',
      name: 'BookList',
      component: () =>
        import('@/views/lib/books/list'),
      meta: {
        title: '书籍管理',
        icon: 'form'
      }
    }]
  },
  {
    path: 'books_edit',
    name: 'BookEdits',
    component: () =>
      import('@/views/lib/books/options'),
    redirect: '/lib/books/index',
    meta: {
      title: '书籍管理',
      icon: 'form'
    },
    hidden: true,
    children: [
    {
      path: 'options/:id(\\d+)',
      name: 'BookEdit',
      component: () =>
        import('@/views/lib/books/options'),
      meta: {
        title: '编辑书籍',
        icon: 'form'
      }
    }]
  },
  {
    path: 'article',
    name: 'Articlepage',
    component: () =>
      import('@/views/lib/article/list'),
    redirect: '/lib/article/index',
    meta: {
      title: '文章管理',
      icon: 'form'
    },
    children: [{
      path: 'index',
      name: 'ArticleList',
      component: () =>
        import('@/views/lib/article/list'),
      meta: {
        title: '文章管理',
        icon: 'form'
      }
    }]
  }, {
    path: 'article_edit',
    name: 'ArticleEdits',
    component: () =>
      import('@/views/lib/article/options'),
    redirect: '/lib/article/index',
    meta: {
      title: '文章管理',
      icon: 'form'
    },
    hidden: true,
    children: [
    {
      path: 'options/:id(\\d+)',
      name: 'ArticleEdit',
      component: () =>
        import('@/views/lib/article/options'),
      meta: {
        title: '编辑文章',
        icon: 'form'
      }
    }]
  },
  {
    path: 'sepkind',
    name: 'Sepkind',
    component: () =>
      import('@/views/lib/sepkind/list'),
    redirect: '/lib/sepkind/index',
    meta: {
      title: '分类管理',
      icon: 'form'
    },
    children: [{
      path: 'index',
      name: 'sepkindList',
      component: () =>
        import('@/views/lib/sepkind/list'),
      meta: {
        title: '分类管理',
        icon: 'form'
      }
    }]
  }, {
    path: 'sepkind_edit',
    name: 'SepkindEdits',
    component: () =>
      import('@/views/lib/sepkind/options'),
    redirect: '/lib/sepkind/index',
    meta: {
      title: '分类管理',
      icon: 'form'
    },
    hidden: true,
    children: [
    {
      path: 'options/:id(\\d+)',
      name: 'SepkindEdit',
      component: () =>
        import('@/views/lib/sepkind/options'),
      meta: {
        title: '编辑分类',
        icon: 'form'
      }
    }]
  }]
}
export default lib
