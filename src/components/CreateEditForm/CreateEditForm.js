import React from 'react'
import { PropTypes } from 'prop-types'

import CreateField from '../CreateField/CreateField'
import EditField from '../EditField/EditField'

const CreateEditForm = ({ formTitle, tagList, submitFunc, title, description, body, reset }) => {
  const props = { tagList, submitFunc, title, description, body, reset }
  return <>{formTitle == 'Create new article' ? <CreateField {...props} /> : <EditField {...props} />}</>
}

CreateEditForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string),
  submitFunc: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
  reset: PropTypes.bool,
}

CreateEditForm.defaultProps = {
  tagList: [''],
  title: '',
  description: '',
  body: '',
  reset: false,
}

export default CreateEditForm
