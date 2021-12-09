import { Link } from 'react-router-dom'
import { IQuestionDescription } from '../../interfaces/IQuestion'
import { Container } from './styles'
import { useEffect, useState } from 'react'
import { convertFromHTML } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'
import { Form } from '@unform/web'
import { Editor } from '../Editor'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

export const Question = ({
  curso,
  disciplina,
  edicao,
  enunciado,
  id,
  numQuestao
}: IQuestionDescription) => {
  return (
    <Container>
      <Link to={`/questao/${id}`}>
        <div>
          <h1>{curso.nome}</h1>
          <strong>Questão {numQuestao}</strong>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: JSON.parse(enunciado)
          }}></div>
        <div>
          <div>
            {disciplina?.map((disciplin) => (
              <p key={disciplin.id}>{disciplin.nome}</p>
            ))}
          </div>

          <strong>Edição {edicao}</strong>
        </div>
      </Link>
    </Container>
  )
}
