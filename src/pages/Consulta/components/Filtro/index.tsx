import { FormHandles } from '@unform/core'
import { useCallback, useRef, useState } from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import { useDebaunceSelect } from 'src/hooks/useDebaunce'
import { ICursoResponse } from 'src/interfaces/ICurso'
import { coursesService } from 'src/services/coursesService'
import { subjectsService } from 'src/services/subjectsService'
import { handleNumberSelect } from 'src/utils/listNumbers'
import { IFilter } from '../..'
import { Select } from '../../../../components/Selects/Select'
import { SelectDefault } from '../../../../components/Selects/SelectDefault'
import { usePopup } from '../../../../hooks/usePopup'

import { Container } from './styles'

interface IFiltroProps {
  open: boolean
  setIsOpen: (value: boolean) => void
  filter: (params: IFilter) => void
}

export const Filtro = ({ open, setIsOpen, filter }: IFiltroProps) => {
  const { addPopup } = usePopup()
  const [typeQuestion, setTypeQuestion] = useState<any>('')
  const formRef = useRef<FormHandles>(null)
  const [disciplinas, setDisciplinas] = useState([])
  const [courseId, setCourceId] = useState<number | undefined>(undefined)
  const [edicoes, setEdicoes] = useState([])
  const [courses, setCources] = useState<ICursoResponse[]>([])
  const [paramsFilter, setParamsFilter] = useState<IFilter>({
    teste: undefined,
    disciplina: undefined,
    edicao: undefined,
    numeroQuestao: undefined,
    tipoQuestao: undefined
  })

  const debounceCurse = useDebaunceSelect({
    fn: coursesService.getCourses,
    delay: 500
  })

  const debounceSubject = useDebaunceSelect({
    fn: subjectsService.getSubjects,
    delay: 500
  })

  const handleSearchCourse = async (search: string) => {
    try {
      const response: any = await debounceCurse({
        header: {
          'Page-Size': 10,
          'Page-Number': 0
        },
        params: {
          nome: search === '' ? undefined : search
        }
      })

      setCources(response.results)

      const courcesFormat = response.results.map((curse: any) => {
        return {
          value: curse.id,
          label: curse.nome
        }
      })

      return courcesFormat
    } catch (err) {}
  }

  const handleSearchSubject = async (search: string) => {
    try {
      const response: any = await debounceSubject({
        header: {
          'Page-Size': 10,
          'Page-Number': 0
        },
        params: {
          nome: search === '' ? undefined : search
        }
      })

      setCources(response.results)

      const courcesFormat = response.results.map((curse: any) => {
        return {
          value: curse.id,
          label: curse.nome
        }
      })

      return courcesFormat
    } catch (err) {}
  }

  const searchSubjects = async (id: number) => {
    try {
      const response = await subjectsService.getSubjects({
        params: { curso: id }
      })

      const subjectsFormt: any = response.results.map((subject: any) => {
        return {
          value: subject.id,
          label: subject.nome
        }
      })

      setDisciplinas(subjectsFormt)
    } catch (err) {}
  }

  const onChangeCurse = (e: any) => {
    setCourceId(e.value)
    searchSubjects(e.value)
    const cource: any = courses.find((item: any) => item.id === e.value)

    const courcesEditions = cource?.edicoes?.map((edicao: number) => {
      return {
        value: edicao,
        label: edicao
      }
    })

    setEdicoes(courcesEditions)
  }

  const handleTypeQuestion = (value: string) => {
    setTypeQuestion((state: any) => {
      return state === value ? '' : value
    })
  }

  const handleFilter = () => {
    console.log({
      ...paramsFilter,
      teste: courseId,
      tipoQuestao: typeQuestion === '' ? undefined : typeQuestion
    })
    filter({
      ...paramsFilter,
      teste: courseId,
      tipoQuestao: typeQuestion === '' ? undefined : typeQuestion
    })
  }

  return open ? (
    <Container
      ref={formRef}
      onSubmit={() => console.log('')}
      typeQuestion={typeQuestion}>
      <div>
        <h1>Filtros</h1>
        <button onClick={() => setIsOpen(false)}>
          <AiFillCloseSquare size={33} />
        </button>
      </div>

      <div>
        <strong>Cursos</strong>
        <SelectDefault
          name="curso"
          handleSearch={handleSearchCourse}
          isLoadingMessage="Procurando curso..."
          placeholder="Selecione uma curso"
          messageNoOptions="Nenhum curso encontrado"
          onChange={onChangeCurse}
        />
      </div>
      <div>
        <strong>Disciplina</strong>
        {courseId ? (
          <Select
            optionsMessage="Disciplina não encontrada"
            options={disciplinas}
            placeholder="Selecione uma disciplina"
            name="disciplinas"
            onChange={(e: any) => {
              setParamsFilter((state) => {
                return {
                  ...state,
                  disciplina: e.value
                }
              })
            }}
          />
        ) : (
          <SelectDefault
            name="disciplinas"
            handleSearch={handleSearchSubject}
            isLoadingMessage="Procurando disciplina..."
            placeholder="Selecione uma disciplina"
            messageNoOptions="Nenhuma disciplina encontrada"
            onChange={(e: any) => {
              setParamsFilter((state) => {
                return {
                  ...state,
                  disciplina: e.value
                }
              })
            }}
          />
        )}
      </div>
      <div>
        <strong>Edição</strong>
        <Select
          name="edicao"
          placeholder="Selecione uma edição"
          options={edicoes}
          optionsMessage="Edição não encontrada"
          onChange={(e: any) => {
            setParamsFilter((state) => {
              return {
                ...state,
                edicao: e.value
              }
            })
          }}
        />
      </div>
      <div>
        <strong>Número da questão</strong>
        <Select
          name="questao"
          placeholder="Selecione um número"
          options={handleNumberSelect()}
          optionsMessage="Questão não encontrada"
          onChange={(e: any) => {
            setParamsFilter((state) => {
              return {
                ...state,
                numeroQuestao: e.value
              }
            })
          }}
        />
      </div>
      <div>
        <strong>Tipo da questão</strong>
        <div>
          <button
            onClick={() => handleTypeQuestion('dissertativa')}
            type="button">
            Dissertativa
          </button>
          <button
            onClick={() => handleTypeQuestion('alternativa')}
            type="button">
            Alternativa
          </button>
        </div>
      </div>
      <button onClick={handleFilter}>Filtrar</button>
    </Container>
  ) : (
    <></>
  )
}
