import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, deleteQuestion, updateCorrectAnswer }) {
  //console.log("Questions in QuestionList: ", questions)

  const questionList = questions.map((question) => {
    return <QuestionItem
      key={question.id} 
      question={question} 
      deleteQuestion={deleteQuestion}
      updateCorrectAnswer={updateCorrectAnswer}
    />
  })
  //console.log(questionList);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
