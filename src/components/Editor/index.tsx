import { useField } from '@unform/core'
import { Container, Error } from './styles'
import { convertToRaw, EditorState } from 'draft-js'
import { useEffect, useRef, useState } from 'react'
import { Editor as EditorDefault } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { FiAlertCircle } from 'react-icons/fi'
import { imgurService } from 'src/services/imgurService'
import { imgBBService } from 'src/services/imgBBService'
import { usePopup } from 'src/hooks/usePopup'

interface IEditorProps {
  name: string
}

export const Editor = ({ name }: IEditorProps) => {
  const { addPopup } = usePopup()
  const editorRef = useRef(null)
  const [editor, setEditor] = useState<EditorState>(EditorState.createEmpty())

  const { fieldName, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: editorRef.current,
      getValue: () => {
        if (
          JSON.stringify(
            draftToHtml(convertToRaw(editor.getCurrentContent()))
          ) === JSON.stringify('<p></p>\n')
        ) {
          return
        }

        return JSON.stringify(
          draftToHtml(convertToRaw(editor.getCurrentContent()))
        )
      },
      setValue: () => {
        setEditor(EditorState.createEmpty())
      }
    })
  }, [fieldName, registerField, editor])

  const handleEditorStateChange = (editorState: EditorState) => {
    setEditor(editorState)
  }

  const reuploadImg = async (file: any) => {
    try {
      const data = new FormData()
      data.append('image', file)
      const response = await imgBBService.uploadImg(data)
      return response
    } catch (err) {
      addPopup({
        type: 'error',
        title: 'Ocorreu um erro',
        description: 'Não foi possivel hospedar a image :('
      })
    }
  }

  const uploadImg = async (file: any) => {
    try {
      const data = new FormData()
      data.append('image', file)
      const response = await imgurService.uploadImg(data)
      return response
    } catch (err) {
      return reuploadImg(file)
    }
  }

  return (
    <Container>
      <EditorDefault
        editorState={editor}
        onEditorStateChange={handleEditorStateChange}
        placeholder="Enunciado"
        ref={editorRef}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          image: {
            uploadCallback: uploadImg,
            alt: { present: true, mandatory: false }
          }
        }}
        toolbarStyle={{
          background: '#25232F',
          borderRadius: '5px',
          padding: '10px'
        }}
        editorStyle={{
          background: '#fff',
          overflowX: 'hidden',
          minHeight: 140,
          resize: 'vertical',
          padding: '0 10px',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.1)'
        }}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" />
        </Error>
      )}
    </Container>
  )
}
