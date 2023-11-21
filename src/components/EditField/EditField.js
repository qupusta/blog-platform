import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSpring, animated } from 'react-spring'

import classes from './EditField.module.scss'

const EditField = ({ tagList, submitFunc, title, description, body, reset }) => {
  const clearTagList = (index, setInnerTagList) => {
    setInnerTagList((tags) => {
      if (tags[index] && tags.length > 1) {
        return [...tags.slice(0, index), ...tags.slice(index + 1, tags.length)]
      }
      return ['']
    })
  }
  const correctTagList = useMemo(() => (tagList.length < 1 ? [''] : tagList), [tagList])
  const listRef = useRef()
  const [innerTagList, setInnerTagList] = useState(correctTagList)

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const onSubmit = (data) => {
    submitFunc(data)
  }

  useEffect(() => {
    if (reset) {
      setValue('title', '')
      setValue('description', '')
      setValue('body', '')
      remove()
      setInnerTagList([''])
    }
  }, [reset, setValue, remove])

  useEffect(() => {
    correctTagList.forEach((tag) => append({ tag }))
  }, [append, correctTagList])

  const opacityAnimate = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  })

  const errorInputClass = `${classes.input} ${classes.errorInput}`

  return (
    <animated.div style={opacityAnimate}>
      <div className={classes.formContainer}>
        <h2 className={classes.header}>Edit article</h2>
        <form className={classes.formBody} onSubmit={handleSubmit(onSubmit)}>
          <label className={classes.label} htmlFor="title">
            Title
          </label>
          <input
            {...register('title', {
              required: true,
            })}
            id="title"
            aria-invalid={errors.title ? 'true' : 'false'}
            className={errors.title?.type ? errorInputClass : classes.input}
            placeholder="Title"
            defaultValue={title}
          />
          {errors.title?.type === 'required' && <p role="alert">Enter the title</p>}

          <label className={classes.label} htmlFor="description">
            Short description
          </label>
          <input
            {...register('description', {
              required: true,
            })}
            id="description"
            aria-invalid={errors.description ? 'true' : 'false'}
            className={errors.description?.type ? errorInputClass : classes.input}
            placeholder="Description"
            defaultValue={description}
          />
          {errors.description?.type === 'required' && <p role="alert">Enter the description</p>}

          <label className={classes.label} htmlFor="text">
            Text
          </label>
          <textarea
            placeholder="Text"
            className={errors.body?.type ? `${classes.errorAria} ${classes.textaria}` : classes.textaria}
            id="text"
            {...register('body', { required: true })}
            defaultValue={body}
          />
          {errors.body?.type === 'required' && <span className={classes.errorMessage}>This is a required field</span>}
          <div className={classes.tagBlock}>
            <p className={classes.title}>Tags</p>
            <ul className={classes.tagList} ref={listRef}>
              {fields.map((item, index) => (
                <li key={item.id} className={classes.string}>
                  <label className={classes.hide} htmlFor="tag">
                    for tag
                  </label>
                  <input
                    type="input"
                    placeholder="Tag"
                    id="tag"
                    {...register(`tagList[${index}].tag`)}
                    className={classes.input}
                    defaultValue={innerTagList[index]}
                  />
                  <button
                    type="button"
                    className={`${classes.delete} ${classes.tagBtn}`}
                    onClick={() => {
                      const inputsCount = Array.from(listRef.current.children).length
                      clearTagList(index, setInnerTagList)
                      remove(index)
                      if (inputsCount === 1) {
                        append({ tag: 'tag' })
                      }
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className={`${classes.add} ${classes.tagBtn}`} onClick={() => append({ tag: '' })}>
              Add tag
            </button>
          </div>
          <button type="submit" className={classes.btn}>
            Send
          </button>
        </form>
      </div>
    </animated.div>
  )
}

export default EditField
