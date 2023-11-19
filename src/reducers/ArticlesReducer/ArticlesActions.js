const articleActions = {
  getArticle: (content) => ({ type: 'GET_ARTICLE', content }),

  failDownloading: (error) => ({ type: 'FAIL_DOWNLOADING', error }),

  setLoad: () => ({ type: 'SET_LOAD' }),

  setModal: (status) => ({ type: 'SET_MODAL', status }),

  changeCreateEditStatus: (status) => ({ type: 'CHANGE_ARTICLE_STATUS', status }),

  changeEditStatus: (status) => ({ type: 'CHANGE_USER_EDITING_STATUS', status }),
}

export default articleActions
