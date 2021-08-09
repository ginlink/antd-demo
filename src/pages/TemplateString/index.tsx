import React, { memo } from 'react'
import styled, { CSSObject } from 'styled-components'
import { t } from 'utils/screen-adaptiton'

const Base = styled.div`
  width: 200px;
`

const a = 200

const Wrapper = styled(Base)`
  width: 100px;
  height: ${a}px;

  border: 1px solid red;

  @media (max-width: 960px) {
    width: 100px;
    height: 100px;
  }
`

const Wrapper1 = styled(Base)`
  width: 100px;
  height: ${a}px;

  border: 1px solid red;

  @media (max-width: 960px) {
    width: 100px;
    height: 100px;
  }
`

const Wrapper2 = styled(Base)`
  width: 100px;
  height: ${a}px;

  border: 1px solid red;
`

function TemplateString() {
  return (
    <>
      <Wrapper>TemplateString</Wrapper>
    </>
  )
}

export default memo(TemplateString)
