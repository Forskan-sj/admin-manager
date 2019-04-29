import Layout from '@/views/layout/Layout'

const college = {
  path: '/college',
    component: Layout,
    redirect: '/college/school_type/index',
    name: 'College',
    meta: {
      title: '基本管理',
      icon: 'example'
    },
    children: [{
      path: 'school_type',
      name: 'StypePage',
      component: () =>
        import('@/views/college/school_type/list'),
      redirect: '/college/school_type/index',
      meta: {
        title: '类型管理',
        icon: 'form'
      },
      children: [{
        path: 'index',
        name: 'StypeList',
        component: () =>
          import('@/views/college/school_type/list'),
        meta: {
          title: '类型管理',
          icon: 'form'
        }
      }]
    },
    {
      path: 'school_type_edit',
      name: 'StypeEdits',
      component: () =>
        import('@/views/college/school_type/options'),
      redirect: '/college/school_type/index',
      meta: {
        title: '类型管理',
        icon: 'form'
      },
      hidden: true,
      children: [
      {
        path: 'options/:id(\\d+)',
        name: 'StypeEdit',
        component: () =>
          import('@/views/college/school_type/options'),
        meta: {
          title: '编辑类型',
          icon: 'form'
        }
      }]
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
      redirect: '/college/course/index',
      component: () =>
        import('@/views/college/course/list'),
      meta: {
        title: '课程库',
        icon: 'form'
      },
      children: [{
        path: 'index',
        name: 'CourseList',
        component: () =>
          import('@/views/college/course/list'),
        meta: {
          title: '课程库',
          icon: 'form'
        }
      }]
    },
    {
      path: 'praxis',
      name: 'CoursePraxis',
      component: () =>
        import('@/views/college/course/praxis'),
      redirect: '/college/course/index',
      meta: {
        title: '课程库',
        icon: 'form'
      },
      hidden: true,
      children: [
      {
        path: 'praxis/:id(\\d+)',
        name: 'CoursePraxiss',
        component: () =>
          import('@/views/college/course/praxis'),
        meta: {
          title: '批改作业',
          icon: 'form'
        }
      }]
    },
    {
      path: 'discuss',
      name: 'Coursediscuss',
      component: () =>
        import('@/views/college/course/discuss'),
      redirect: '/college/course/index',
      meta: {
        title: '课程库',
        icon: 'form'
      },
      hidden: true,
      children: [
      {
        path: 'discuss/:id(\\d+)',
        name: 'Coursediscusss',
        component: () =>
          import('@/views/college/course/discuss'),
        meta: {
          title: '课程评论',
          icon: 'form'
        }
      }]
    },
    {
      path: 'course_edit',
      name: 'CoursePages',
      component: () =>
        import('@/views/college/course/options'),
      redirect: '/college/course/index',
      meta: {
        title: '课程库',
        icon: 'form'
      },
      hidden: true,
      children: [
      {
        path: 'options/:id(\\d+)',
        name: 'CourseEdit',
        component: () =>
          import('@/views/college/course/options'),
        meta: {
          title: '编辑课程',
          icon: 'form'
        }
      }]
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
      redirect: '/college/question/index',
      component: () =>
        import('@/views/college/question/list'),
      meta: {
        title: '题库管理',
        icon: 'form'
      },
      children: [{
        path: 'index',
        name: 'QuestionList',
        component: () =>
          import('@/views/college/question/list'),
        meta: {
          title: '题库管理',
          icon: 'form'
        }
      }]
    },
    {
      path: 'question_edit',
      name: 'QuestionEdits',
      component: () =>
        import('@/views/college/question/options'),
      redirect: '/college/question/index',
      meta: {
        title: '题库管理',
        icon: 'form'
      },
      hidden: true,
      children: [
      {
        path: 'options/:id(\\d+)',
        name: 'QuestionEdit',
        component: () =>
          import('@/views/college/question/options'),
        meta: {
          title: '编辑题库',
          icon: 'form'
        }
      }]
    },
    {
      path: 'exam',
      name: 'ExamPage',
      redirect: '/college/exam/index',
      component: () =>
        import('@/views/college/exam/list'),
      meta: {
        title: '考试管理',
        icon: 'form'
      },
      children: [{
        path: 'index',
        name: 'ExamList',
        component: () =>
          import('@/views/college/exam/list'),
        meta: {
          title: '考试管理',
          icon: 'form'
        }
      }]
    },
    {
      path: 'exam_edit',
      name: 'ExamEdits',
      component: () =>
        import('@/views/college/exam/options'),
      redirect: '/college/exam/index',
      meta: {
        title: '考试管理',
        icon: 'form'
      },
      hidden: true,
      children: [
      {
        path: 'options/:id(\\d+)',
        name: 'ExamEdit',
        component: () =>
          import('@/views/college/exam/options'),
        meta: {
          title: '编辑考试',
          icon: 'form'
        }
      }]
    },
    {
      path: 'teacher',
      name: 'TeacherPage',
      redirect: '/college/teacher/index',
      component: () =>
        import('@/views/college/teacher/list'),
      meta: {
        title: '讲师管理',
        icon: 'form'
      },
      children: [{
        path: 'index',
        name: 'TeacherList',
        component: () =>
          import('@/views/college/teacher/list'),
        meta: {
          title: '讲师管理',
          icon: 'user'
        }
      }]
    },
    {
      path: 'teacher_edit',
      name: 'TeacherEdits',
      component: () =>
        import('@/views/college/teacher/options'),
      redirect: '/college/teacher/index',
      meta: {
        title: '讲师管理',
        icon: 'form'
      },
      hidden: true,
      children: [
      {
        path: 'options/:id(\\d+)',
        name: 'TeacherEdit',
        component: () =>
          import('@/views/college/teacher/options'),
        meta: {
          title: '编辑讲师',
          icon: 'form'
        }
      }]
    }]
}
export default college
