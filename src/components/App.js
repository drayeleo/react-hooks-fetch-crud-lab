import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  const url = 'http://localhost:4000/questions';

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, [])

  function addNewQuestion(dataToPost) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToPost),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setQuestions([...questions, data]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function deleteQuestion(id) {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setQuestions(questions.filter((question) => question.id !== id));
  }

  function updateCorrectAnswer(id, correctAnswer) {

    fetch(`${url}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        correctIndex: correctAnswer,
      }),
      headers: {
        'Content-type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => {
        console.error('Error:', error);
      });

    setQuestions(questions.map((question) => {
      if (question.id === id) {
        return { ...question, correctIndex: correctAnswer };
      } else {
        return question;
      }
    }))
  }

  function displayComponent() {
    if (page === "Form") {
      return <QuestionForm addNewQuestion={addNewQuestion} />
    } else {
      return <QuestionList
        questions={questions}
        deleteQuestion={deleteQuestion}
        updateCorrectAnswer={updateCorrectAnswer}
      />
    }
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {displayComponent()}
    </main>
  );
}

export default App;

/*
App
  AdminNavBar
    QuestionList
      QuestionItem(s)
    QuestionForm
*/