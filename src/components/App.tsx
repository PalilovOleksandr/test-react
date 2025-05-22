import Mailbox from './Mailbox/Mailbox';
import Product from './Product/Product';
import Button from './Button/Button';
import bookData from "../books.json";
import Alert from './Alert/Alert';
import UserMenu from './UserMenu/UserMenu';
import "modern-normalize";
import "../global.css"
import ClickCounter from './ClickCounter/ClickCounter';
import { useEffect, useState } from 'react';
import Form from './Form/Form';
import OrderForm from './OrderForm/OrderForm';
import SearchForm from './SearchForm/SearchForm';
import type { Article, OrderData } from '../types/types';
import ArticleList from './ArticleList/ArticleList';
import { FetchArticles } from '../services/articlesService';
import axios from 'axios';
import Timer from './Timer/Timer';
import Modal from './Modal/Modal';
interface Book {
  id: string;
  name: string;
}
interface Values {
  x: number;
  y: number;
}
interface Character {
  name: string;
  height: number;
}
const books: Book[] = bookData;
export default function App() {
  // ---
  const [values, setValues] = useState<Values>({ x: 0, y: 0 });
  const updateValue = (key: keyof Values) => {
    setValues({
      ...values,
      [key]: values[key] + 1,
    });
  }
  // ---

  // ---
  const [clicks, setClicks] = useState<number>(() => {
    const savedClicks = window.localStorage.getItem("saved-clicks");
    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }
    return 0;
  });
  const handleClick = () => {
    setClicks(clicks + 1);
  };
  useEffect(() => {
    localStorage.setItem("saved-clicks", JSON.stringify(clicks))
  }, [clicks]);
  // ---

  // ---
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMessage = () => {
    setIsOpen(!isOpen);
  }
  // ---

  // ---
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await FetchArticles(topic)
      setArticles(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }
  // ---

  // ---
  const myKey = import.meta.env.VITE_API_KEY;
  // ---

  // ---
  const handleOrder = (data: OrderData) => {
    console.log("Order", data);
  }
  // ---
  // ---
  const [person, setPerson] = useState<Character | null>(null);
  const [count, setCount] = useState(1);
  useEffect(() => {
    async function fetchCharacter() {
      const response = await axios.get(`https://swapi.info/api/people/${count}`);
      setPerson(response.data)
    }
    fetchCharacter();
  }, [count])
  console.log("App rendred!")
  // ---
  // ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // ---
  return (
    <>
      <div>
        <h1>Best selling</h1>
        <Product
          name="Tacos With Lime"
          imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=640"
          price={50} />
        <Product name="Fries and Burger"
          imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=640"
          price={150} />
      </div>
      <div>
        <Mailbox
          username='Kate'
          unreadMessages={["Hello,Kate", "How are you?"]} />
        <Mailbox
          username='Alex'
          unreadMessages={[]} />
      </div>
      <div>
        <h1>Book of the week</h1>
        <ul>
          {books.map(({ id, name }) => (
            <li key={id}>
              {name}
            </li>
          ))}
        </ul>
      </div >
      <div>
        <Alert message='Task not started' />
        <Alert type='success' message='The task is completed successfully' />
        <Alert type='error' message='The task was performed incorrectly' />
      </div>
      <div>
        <Button variant='primary' text="Login" />
        <Button variant='secondary' text="Follow" />
      </div>
      <div>
        <UserMenu name="Palilov" />
      </div>
      <div>
        <ClickCounter value={clicks} onUpdate={handleClick} />
        <ClickCounter value={clicks} onUpdate={() => setClicks(0)} />
      </div>
      <div>
        <button style={{ display: "block", marginTop: "20px" }} onClick={toggleMessage}>{isOpen ? "hide message" : "Show message"}</button>
        {isOpen && <p>🎉 Surprise! You toggled me.</p>}
      </div>
      <div>
        <p>x: {values.x}, y: {values.y}</p>
        <button onClick={() => updateValue("x")}>Update x</button>
        <button onClick={() => updateValue("y")}>Update y</button>
      </div>
      <div>
        <Form />
        <OrderForm onSubmit={handleOrder} />
      </div>
      <div>
        <p>{myKey}</p>
        <SearchForm onSubmit={handleSearch} />
        {isLoading && <p>Loading data,please wait...</p>}
        {isError && <p>OMAGAD IT IS ERORR,HELP PLEASE</p>}
        {articles.length > 0 && (<ArticleList items={articles} />)}
      </div>
      <div>
        <h2>The count is {count}</h2>
        <button onClick={() => setCount(count + 1)}>Get next character</button>
        <pre>{JSON.stringify(person, null, 2)}</pre>
      </div>
      <div>
        <button onClick={toggleMessage}>
          {isOpen ? "Hide timer" : "Show timer"}
        </button>
        {isOpen && <Timer />}
      </div>
      <div>
        <h1>Main content of the page</h1>
        <button onClick={openModal}>Open modal</button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <h2>Custom Modal Content</h2>
            <p>This is a reusable modal with dynamic content.</p>
          </Modal>)}
      </div>
      <div>

      </div>
    </>
  );
}