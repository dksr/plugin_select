import './styles'
import { Select } from './Select';

const callbackFn = (data) => {
  console.log(data);
}

const select = new Select("#select", {
    list: [
      {id: "1", title: "Javascript"},
      {id: "2", title: "React"},
      {id: "3", title: "React Native"},
      {id: "4", title: "Angular"},
      {id: "5", title: "NodeJS"},
    ],
    selectedID: "1",
    callbackFn
  }
)

window.s = select