import React from 'react'
import styled from 'styled-components'

const VignetForm=styled.form`
  margin:auto;
  margin-top: 18px;
  margin-bottom: 15px;
  padding:0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  text-decoration: none;
  list-style-type: none;
  width: 60%;
  height: auto;
`
const BtnOption = styled.div`
  box-sizing: border-box;
  width: auto;
  display: flex;
  justify-content: center;
`
const LabelOption=styled.span`
    border: 0.5px solid #C4C4C4;
    border-radius: 11px;
    display: inline-block;
    height: 100%;
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
    font-size: 12px;
    font-family: "DM sans", arial;
    color:#901C1C;
    text-align: center;
    cursor:pointer;
`
export default function TagsComponent({tags, selectTag}) {
  return (
    <VignetForm>
      {tags.map((tag, index) => ( 
        <BtnOption
          key = {`${index}-${tag}`} tag={tag}>
          <LabelOption onClick={selectTag}>
            {`#${tag}`}
          </LabelOption>
        </BtnOption>
      ))}
    </VignetForm>
  )
}
