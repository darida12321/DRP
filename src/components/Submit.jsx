import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

// this is all absolutely fucking horrible

function Example(props) {
  const newExample = () => {
    return ({
      initial: {
        code: '',
        cLine: 0,
        cPos: 0, 
      },
      expected: {
        code: '',
        cLine: 0,
        cPos: 0,
      },
    });
  }

  const [state, setState] = React.useState(newExample())

  const updateData = (o, k, v) => {
    let newState = Object.assign({}, state);
    newState[o][k] = v;
    setState(newState);
    props.callback(props.id, newState);
  }

  return (
    <div id={props.id}>
      <h4>Example {props.id + 1}</h4>
      <textarea
        placeholder='initial code'
        onChange={(e) => {updateData('initial', 'code', e.target.value)}}
      /><br/>
      <input
        placeholder='initial cLine'
        onChange={(e) => {updateData('initial', 'cLine', Number(e.target.value))}}
      />
      <input
        placeholder='initial cPos'
        onChange={(e) => {updateData('initial', 'cPos', Number(e.target.value))}}
      />
      <br/><br/>
      <textarea
        placeholder='expected code'
        onChange={(e) => {updateData('expected', 'code', e.target.value)}}
      /><br/>
      <input
        placeholder='expected cLine'
        onChange={(e) => {updateData('expected', 'cLine', Number(e.target.value))}}
      />
      <input
        placeholder='expected cPos'
        onChange={(e) => {updateData('expected', 'cPos', Number(e.target.value))}}
      />
    </div>
  );

}

function Submit() {
  const [lesson, setLesson] = React.useState({});
  const [examples, setExamples] = React.useState([]);
  const [setup, setSetup] = React.useState({});

  const setData = (o, f) => {
    switch (o) {
      case lesson:
        return setLesson(f);
      case setup:
        return setSetup(f);
      default:
        return undefined;
    }
  }

  const updateData = (o, k, v) => { 
    setData(o,
      (prevState) => {
        let newState = Object.assign({}, prevState);
        newState[k] = v;
        return newState;
      }
    );
  }

  const addExample = (o) => {
    let newEx = [...examples];
    newEx.push(o);
    setExamples(newEx);
  }

  const updateExample = (id, v) => {
    let newEx = [...examples];
    newEx[id] = v;
    setExamples(newEx);
  }

  const removeExample = () => {
    let newEx = [...examples];
    newEx.pop();
    setExamples(newEx);
  }

  const buildObj = () => {
    let obj = {
      lesson: lesson,
      examples: examples,
    };
    obj.lesson.editorSetup = setup;
    return obj;
  }

  const publishObj = async () => {
    try {
      const docRef = await addDoc(collection(db, 'lessons'), buildObj());
      console.log('document written with id', docRef.id);
    } catch (e) {
      console.log('error occured publishing doc to firebase');
    }
  }

  return (
    <div>
      <div className = 'input'>
        <h2>Lesson</h2>
        <input 
          placeholder='title' 
          onChange={(e) => updateData(lesson, 'title', e.target.value)} 
        /><br/>
        <textarea
          placeholder='description'
          onChange={(e) => updateData(lesson, 'description', e.target.value)}
        /><br/>
        <input 
          placeholder='img'
          onChange={(e) => updateData(lesson, 'img', e.target.value)}
        /><br/>
        <h2>Editor Setup</h2>
        <button
          id="mouseInput"
          type="checkbox"
          onClick={(e) => updateData(setup, 'mouseInput', !setup.mouseInput)}
        >mouseInput: {setup.mouseInput ? "on" : "off"}</button><br/>
        <button
          id="keyboardInput"
          type="checkbox"
          onClick={(e) => updateData(setup, 'keyboardInput', !setup.keyboardInput)}
        >keyboardInput: {setup.keyboardInput ? "on" : "off"}</button><br/>
        <input
          placeholder='selectedKeys'
          onChange={(e) => updateData(setup, 'selectedKeys', e.target.value.split(" "))}
        />
        <button
          id="whitelist"
          type="checkbox"
          onClick={(e) => updateData(setup, 'whitelist', !setup.whitelist)}
        >{setup.whitelist ? "whitelist" : "blacklist"}</button><br/>
        <input
          placeholder='checking'
          onChange={(e) => updateData(setup, 'checking', e.target.value)}
        /><br/>
        <input
          placeholder='editorMode'
          onChange={(e) => updateData(setup, 'editorMode', e.target.value)}
        /><br/>
        <input
          placeholder='editorLanguage'
          onChange={(e) => updateData(setup, 'editorLanguage', e.target.value)}
        /><br/>
        <h2>Examples</h2>
        {examples.map(
          (e, i) => (
            <Example key={i} id={i} callback={updateExample}/>
          )
        )}<br/>
        <button onClick={() => {
          addExample({});
        }}>Click to add new example</button>
        <button onClick={() => {
          removeExample(); 
        }}>Click to remove latest example</button>
        <br/><br/>
        <button onClick={() => {
          publishObj();
        }}> Click to submit </button><br/>
      </div>
      <div className='preview'>
        <p>{JSON.stringify(buildObj(), null, "\t")}</p>
      </div>
    </div>
  );
}

export default Submit;