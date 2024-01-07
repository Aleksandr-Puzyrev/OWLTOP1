import Button from "@/components/Button/Button";
import Htag from "@/components/Htag/Htag";
import Input from "@/components/Input/Input";
import P from "@/components/P/P";
import Rating from "@/components/Rating/Rating";
import Tag from "@/components/Tag/Tag";
import Textarea from "@/components/Textarea/Textarea";
import { API } from "@/helpers/api";
import { MenuItem } from "@/interfaces/menu.interface";
import { withLayout } from "@/layout/Layout";
import axios from "axios";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

function Home(/*{menu}: HomeProps*/): JSX.Element {
  const [rating, setRating] = useState<number>(4);


  // TEST
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    console.log(counter);
  });

  return (
    <>
      <Htag tag="h1">Текст {counter}</Htag>
      <Button appearance="primary" arrow="right" onClick={() => setCounter(x => x + 1)}>Кнопка</Button>
      <Button appearance="ghost" arrow="down">Кнопка 2</Button>
      <P>Студенты освоят не только hard skills, необходимые для работы веб-дизайнером, но и soft skills — навыки, которые позволят эффективно взаимодействовать в команде с менеджерами, разработчиками и маркетологами. Выпускники факультета могут успешно конкурировать с веб-дизайнерами уровня middle.</P>
      <P sizeM="14px">Напишу сразу в двух курсах, так как проходил оба. Java будет многим непросвещённым сложновата в изучении, но здесь перевес из-за лидирующего положения языка как самого популярного в программировании. Выбор мой пал на эту профессию еще и потому, что Java-разработчики получают самую большую зарплату. Хотя Python начинает догонять Java по многим моментам, но вот в крупном екоме разработке Джава все-таки остается главенствующей сейчас. Скажу так – полнота программы и интенсивность присуща обоим курсам GeekBrains. Хочу отметить, что с первого дня занятий вы приступаете к практике и получаете опыт коммерческой разработки уже в свое резюме. Скажу вам как прошедший это – реально помогло в трудоустройстве!</P>
      <P sizeM="18px">Выше указаны программы Adobe InDesign, Adobe Illustrator, Corel Draw и ими можно успешно пользоваться дома или в дороге. Современные ноутбуки хорошо справляются с нагрузкой, так зачем загонять специалиста в душный офис. В этой профессии важным считается вдохновение, поэтому дизайнеры ищут его в разных местах.</P>
      <Tag size="s"> Small</Tag>
      <Tag>default</Tag>
      <Tag size="m" color="red">Mall</Tag>
      <Tag size="m" color="green">Mall2</Tag>
      <Tag size="s" color="primary">SSSS</Tag>
      <Tag size="s" color="ghost">SSSS</Tag>
      <Rating rating={rating} isEditable setRating={setRating}/>
      <Input placeholder="тест"/>
      <Textarea placeholder="тест ареа"/>
      
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {firstCategory});
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown>{
  menu: MenuItem[];
  firstCategory: number;
}