import { useField } from '@unform/core'
import { Container, Error } from './styles'
import { convertToRaw, EditorState } from 'draft-js'
import { useEffect, useRef, useState } from 'react'
import { Editor as EditorDefault } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { FiAlertCircle } from 'react-icons/fi'

interface IEditorProps {
  name: string
}

export const Editor = ({ name }: IEditorProps) => {
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
      }
    })
  }, [fieldName, registerField, editor])

  const handleEditorStateChange = (editorState: EditorState) => {
    setEditor(editorState)
  }

  return (
    <Container>
      <EditorDefault
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        editorState={editor}
        onEditorStateChange={handleEditorStateChange}
        placeholder="Enunciado"
        ref={editorRef}
        toolbarStyle={{
          background: '#25232F',
          borderRadius: '5px',
          padding: '10px'
        }}
        editorStyle={{
          background: '#fff',
          height: 170,
          padding: '0 10px',
          fontFamily: '"Roboto", open-sans',
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
