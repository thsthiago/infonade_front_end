import { Container } from './styles'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IAnotacao, IQuestionResponse } from 'src/interfaces/IQuestion'
import { questionsService } from 'src/services/questionsService'
import { Button } from 'src/components/Button'
import moment from 'moment'
import 'moment/locale/pt-br'
import { Modal } from 'src/components/Modal'
import { usePopup } from 'src/hooks/usePopup'
import { ModalDisciplinas } from './components/ModalDisciplinas'

export const Questao = () => {
  const history = useHistory()
  const { params }: { params: any } = useRouteMatch()
  const { addPopup } = usePopup()
  const [data, setData] = useState<IQuestionResponse>({} as IQuestionResponse)
  const [enunciado, setEnunciado] = useState<any>('')
  const [anotacoes, setAnotacoes] = useState<IAnotacao[]>([])
  const [isOpenModalDisciplina, setIsOpenModalDisciplina] = useState(false)
  const [stateAnotation, setStateAnotation] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState<any>({
    isOpen: false,
    fn: null
  })
  const [isOpenModalAnotacao, setIsOpenModalAnotacao] = useState<any>({
    isOpen: false,
    fn: null
  })

  const initialData = async () => {
    try {
      const response = await questionsService.findOneQuestion(params.id)

      setAnotacoes(response.anotacoes as any)
      setData(response)
      setEnunciado(JSON.parse(response.enunciado))
    } catch (error) {}
  }

  const handleDeleteQuestion = async () => {
    try {
      await questionsService.deleteQuestion(data.id)
      addPopup({
        type: 'success',
        title: 'Questão deletada com sucesso'
      })
      history.push('/consulta')
    } catch (error) {
      addPopup({
        type: 'error',
        title: 'Não foi possivél deletar essa questão'
      })
    }
  }

  const handleDeleteAnotacao = async (id: number) => {
    try {
      const anotacao = anotacoes?.filter((anotacao, index) => index !== id)

      await questionsService.updateQuestion({
        ...data,
        anotacoes: anotacao
      })

      setAnotacoes(anotacao)
      addPopup({
        type: 'success',
        title: 'Anotação deletada com sucesso'
      })
    } catch (error) {
      addPopup({
        type: 'error',
        title: 'Erro ao deletar disciplina'
      })
    }
  }

  const haldleCreateAnotacao = async (e: any) => {
    e.preventDefault()
    try {
      await questionsService.updateQuestion({
        ...data,
        anotacoes: [
          ...anotacoes,
          {
            anotacao: stateAnotation,
            createdAt: new Date().toISOString()
          }
        ]
      })

      setStateAnotation('')

      setAnotacoes((state) => [
        {
          anotacao: stateAnotation,
          createdAt: new Date().toISOString()
        },
        ...state
      ])

      addPopup({
        type: 'success',
        title: 'Anotação criada com sucesso'
      })
    } catch (error) {
      addPopup({
        type: 'error',
        title: 'Erro ao criar anotação'
      })
    }
  }

  useEffect(() => {
    stateAnotation === '' ? setIsDisabled(true) : setIsDisabled(false)
  }, [stateAnotation])

  useEffect(() => {
    moment.locale('pt-br')
    initialData()
  }, [])

  return (
    <>
      <Container>
        <section className="containerQuestao">
          <div className="curso">
            <h1>{data?.curso?.nome}</h1>
            <strong>Edição {data?.edicao}</strong>
          </div>
          <div className="questao">
            <div className="boxDisciplinas">
              <div className="disciplinas">
                {data?.disciplina?.map((disciplina) => (
                  <p>{disciplina?.nome}</p>
                ))}
              </div>

              <strong>Questão {data?.numQuestao}</strong>
            </div>

            <div
              className="enunciado"
              dangerouslySetInnerHTML={{
                __html: enunciado
              }}></div>

            <div className="alternativas">
              {data?.alternativas?.map((alternativa) => (
                <div className="alternativa">
                  <strong
                    className={
                      data.resposta === alternativa.letra ? 'select' : undefined
                    }>
                    {alternativa?.letra}
                  </strong>
                  <p>{alternativa?.enunciado}</p>
                </div>
              ))}
            </div>
            <div className="boxBtns">
              <Button
                color="secondary"
                onClick={() => setIsOpenModalDisciplina(true)}>
                Adicionar disciplina
              </Button>
              <Button color="secondary">Editar</Button>
              <Button
                color="delete"
                onClick={() =>
                  setIsOpenModal({
                    isOpen: true,
                    fn: null
                  })
                }>
                Deletar
              </Button>
            </div>
          </div>
        </section>
        <section className="containerAnotacoes">
          {anotacoes?.length !== 0 && (
            <>
              <h1>Anotações:</h1>

              <div className="anotacoes">
                {anotacoes?.map((anotacao, index) => (
                  <div className="anotacao">
                    <p>{anotacao.anotacao}</p>
                    <div>
                      <p className="date">
                        Criada dia{' '}
                        {moment(new Date(anotacao.createdAt)).format('LLL')}
                      </p>
                      <Button
                        color="delete"
                        style={{ padding: '5px 20px' }}
                        onClick={() => {
                          setIsOpenModalAnotacao({
                            isOpen: true,
                            fn: () => handleDeleteAnotacao(index)
                          })
                        }}>
                        Deletar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="criarAnotacao">
            <h1>Crie uma anotação:</h1>
            <form onSubmit={haldleCreateAnotacao}>
              <textarea
                placeholder="Anotação"
                value={stateAnotation}
                onChange={(e: any) =>
                  setStateAnotation(e.target.value)
                }></textarea>
              <Button
                type="submit"
                disabled={isDisabled}
                color="primary"
                style={{ width: 90 }}>
                Criar
              </Button>
            </form>
          </div>
        </section>
      </Container>

      <ModalDisciplinas
        refresh={initialData}
        data={data}
        isOpen={isOpenModalDisciplina}
        setIsOpen={setIsOpenModalDisciplina}
      />

      <Modal
        isOpen={isOpenModal.isOpen}
        confirm={handleDeleteQuestion}
        setIsOpen={setIsOpenModal}
        name="essa questão"
      />

      <Modal
        isOpen={isOpenModalAnotacao.isOpen}
        confirm={isOpenModalAnotacao.fn}
        setIsOpen={setIsOpenModalAnotacao}
        name="essa anotação"
      />
    </>
  )
}
