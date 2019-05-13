import Layout from '@/views/layout/Layout'

const college = {
  path: '/college',
    component: Layout,
    redirect: '/college/school_type',
    name: 'College',
    id: 10,
    meta: {
      title: '基本管理',
      icon: 'example'
    },
    children: [{
      path: 'school_type',
      name: 'StypePage',
      id: 1110,
      component: () =>
        import('@/views/college/school_type/list'),
      meta: {
        title: '类型管理',
        icon: 'form'
      }
    },
    {
      path: 'school_type/options/:id(\\d+)',
      name: 'StypeEdits',
      id: 1120,
      component: () =>
        import('@/views/college/school_type/options'),
      meta: {
        title: '编辑类型',
        icon: 'form'
      },
      hidden: true
    },
    // {
    //   path: 'school_index',
    //   name: 'SindexPage',
    //   component: () =>
    //     import('@/views/college/school_index/list'),
    //   redirect: '/college/school_index/index',
    //   meta: {
    //     title: '批次管理',
    //     icon: 'form'
    //   },
    //   children: [{
    //     path: 'index',
    //     name: 'SindexList',
    //     component: () =>
    //       import('@/views/college/school_index/list'),
    //     meta: {
    //       title: '批次管理',
    //       icon: 'form'
    //     }
    //   }]
    // },
    // {
    //   path: 'school_index_edit',
    //   name: 'SindexEdits',
    //   component: () =>
    //     import('@/views/college/school_index/options'),
    //   redirect: '/college/school_index/index',
    //   meta: {
    //     title: '批次管理',
    //     icon: 'form'
    //   },
    //   hidden: true,
    //   children: [
    //   {
    //     path: 'options/:id(\\d+)',
    //     name: 'SindexEdit',
    //     component: () =>
    //       import('@/views/college/school_index/options'),
    //     meta: {
    //       title: '编辑批次',
    //       icon: 'form'
    //     }
    //   }]
    // },
    // {
    //   path: 'class',
    //   name: 'ClassPage',
    //   redirect: '/college/class/index',
    //   component: () =>
    //     import('@/views/college/class/list'),
    //   meta: {
    //     title: '班级管理',
    //     icon: 'form'
    //   },
    //   children: [{
    //     path: 'index',
    //     name: 'ClassList',
    //     component: () =>
    //       import('@/views/college/class/list'),
    //     meta: {
    //       title: '班级管理',
    //       icon: 'form'
    //     }
    //   }]
    // },
    // {
    //   path: 'class_edit',
    //   name: 'ClassEdits',
    //   component: () =>
    //     import('@/views/college/class/options'),
    //   redirect: '/college/class/index',
    //   meta: {
    //     title: '班级管理',
    //     icon: 'form'
    //   },
    //   hidden: true,
    //   children: [
    //   {
    //     path: 'options/:id(\\d+)',
    //     name: 'ClassEdit',
    //     component: () =>
    //       import('@/views/college/class/options'),
    //     meta: {
    //       title: '编辑班级',
    //       icon: 'form'
    //     }
    //   }]
    // },
    // {
    //   path: 'class_user',
    //   name: 'ClassUsers',
    //   component: () =>
    //     import('@/views/college/class/class_users'),
    //   redirect: '/college/class/index',
    //   meta: {
    //     title: '班级学员',
    //     icon: 'form'
    //   },
    //   hidden: true,
    //   children: [
    //   {
    //     path: 'users/:id(\\d+)',
    //     name: 'ClassUser',
    //     component: () =>
    //       import('@/views/college/class/class_users'),
    //     meta: {
    //       title: '学员信息',
    //       icon: 'form'
    //     }
    //   }]
    // },
    {
      path: 'course',
      name: 'CoursePage',
      id: 1130,
      component: () =>
        import('@/views/college/course/list'),
      meta: {
        title: '课程库',
        icon: 'form'
      }
    },
    {
      path: 'course/praxis/:id(\\d+)',
      name: 'CoursePraxis',
      id: 1140,
      component: () =>
        import('@/views/college/course/praxis'),
      meta: {
        title: '批改作业',
        icon: 'form'
      },
      hidden: true
    },
    {
      path: 'course/discuss/:id(\\d+)',
      name: 'Coursediscuss',
      id: 1150,
      component: () =>
        import('@/views/college/course/discuss'),
      meta: {
        title: '课程评论',
        icon: 'form'
      },
      hidden: true
    },
    {
      path: 'course/options/:id(\\d+)',
      name: 'CoursePages',
      id: 1160,
      component: () =>
        import('@/views/college/course/options'),
      meta: {
        title: '编辑课程',
        icon: 'form'
      },
      hidden: true
    },
    // {
    //   path: 'series_course',
    //   name: 'SeriesPage',
    //   redirect: '/college/series_course/index',
    //   component: () =>
    //     import('@/views/college/series_course/list'),
    //   meta: {
    //     title: '课程管理',
    //     icon: 'form'
    //   },
    //   children: [{
    //     path: 'index',
    //     name: 'SeriesList',
    //     component: () =>
    //       import('@/views/college/series_course/list'),
    //     meta: {
    //       title: '课程管理',
    //       icon: 'form'
    //     }
    //   }]
    // },
    // {
    //   path: 'series_edit',
    //   name: 'SeriesPages',
    //   component: () =>
    //     import('@/views/college/series_course/options'),
    //   redirect: '/college/series_course/index',
    //   meta: {
    //     title: '课程管理',
    //     icon: 'form'
    //   },
    //   hidden: true,
    //   children: [
    //   {
    //     path: 'options/:id(\\d+)',
    //     name: 'SeriesEdit',
    //     component: () =>
    //       import('@/views/college/series_course/options'),
    //     meta: {
    //       title: '编辑套课',
    //       icon: 'form'
    //     }
    //   }]
    // },
    // {
    //   path: 'series_dis',
    //   name: 'DisLists',
    //   component: () =>
    //     import('@/views/college/series_course/dislist'),
    //   redirect: '/college/series_course/index',
    //   meta: {
    //     title: '课程管理',
    //     icon: 'form'
    //   },
    //   hidden: true,
    //   children: [
    //   {
    //     path: 'dislist/:id(\\d+)',
    //     name: 'DisList',
    //     component: () =>
    //       import('@/views/college/series_course/dislist'),
    //     meta: {
    //       title: '评论',
    //       icon: 'form'
    //     }
    //   }]
    // },
    {
      path: 'question',
      name: 'QuestionPage',
      id: 1170,
      component: () =>
        import('@/views/college/question/list'),
      meta: {
        title: '题库管理',
        icon: 'form'
      }
    },
    {
      path: 'question_edit/:id(\\d+)',
      name: 'QuestionEdits',
      id: 1180,
      component: () =>
        import('@/views/college/question/options'),
      meta: {
        title: '编辑题库',
        icon: 'form'
      },
      hidden: true
    },
    // {
    //   path: 'exam',
    //   name: 'ExamPage',
    //   id: 1190,
    //   redirect: '/college/exam/index',
    //   component: () =>
    //     import('@/views/college/exam/list'),
    //   meta: {
    //     title: '考试管理',
    //     icon: 'form'
    //   },
    //   children: [{
    //     path: 'index',
    //     name: 'ExamList',
    //     id: 1191,
    //     component: () =>
    //       import('@/views/college/exam/list'),
    //     meta: {
    //       title: '考试管理',
    //       icon: 'form'
    //     }
    //   }]
    // },
    // {
    //   path: 'exam_edit',
    //   name: 'ExamEdits',
    //   id: 1200,
    //   component: () =>
    //     import('@/views/college/exam/options'),
    //   redirect: '/college/exam/index',
    //   meta: {
    //     title: '编辑考试',
    //     icon: 'form'
    //   },
    //   hidden: true,
    //   children: [
    //   {
    //     path: 'options/:id(\\d+)',
    //     name: 'ExamEdit',
    //     id: 1201,
    //     component: () =>
    //       import('@/views/college/exam/options'),
    //     meta: {
    //       title: '编辑考试',
    //       icon: 'form'
    //     }
    //   }]
    // },
    {
      path: 'teacher',
      name: 'TeacherPage',
      id: 1210,
      component: () =>
        import('@/views/college/teacher/list'),
      meta: {
        title: '讲师管理',
        icon: 'form'
      }
    },
    {
      path: 'teacher_edit/:id(\\d+)',
      name: 'TeacherEdits',
      id: 1220,
      component: () =>
        import('@/views/college/teacher/options'),
      meta: {
        title: '编辑讲师',
        icon: 'form'
      },
      hidden: true
    }]
}
export default college
