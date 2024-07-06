import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { url_serv } from "./const.js";

function FetchVacancies() {
  const [text, setText] = useState('');
  const [area, setArea] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [salary, setSalary] = useState(0);
  const [schedule, setSchedule] = useState("");
  const [page, setPage] = useState(1);
  const [vacancies, setVacancies] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleFetchVacancies = async (e) => {
    if (e) e.preventDefault();
    const query = { text: text, area: area, per_page: perPage, page: page, salary: salary, schedule: schedule};

    try {
      const response = await axios.post(url_serv + '/fetch-vacancies/', query);
      const vacancies = response.data;
      setVacancies(vacancies);
      setPageCount(20);
    } catch (error) {
      console.error('Ошибка при получении вакансий с сервера:', error);
    }
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const clickLoad = () => {
    setPage(1);
  }

  useEffect(() => {
    if (pageCount!==0) {
      handleFetchVacancies();
    }
  }, [page]);

  return (
    <div className="mt-4">
      <h2>Загрузить вакансии с hh.ru</h2>
      <form onSubmit={handleFetchVacancies}>
        <div className="form-group">
          <label>Поиск:</label>
          <input
            type="text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Регион (ID):</label>
          <select
            className="form-control"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <option value="113">Россия</option>
            <option value="1">Москва</option>
            <option value="2">Санкт-Петербург</option>
            <option value="130">Севастополь</option>
            <option value="1217">Алтайский край</option>
            <option value="1932">Амурская область</option>
            <option value="1008">Архангельская область</option>
            <option value="1505">Астраханская область</option>
            <option value="1817">Белгородская область</option>
            <option value="1828">Брянская область</option>
            <option value="1716">Владимирская область</option>
            <option value="1511">Волгоградская область</option>
            <option value="1739">Вологодская область</option>
            <option value="1844">Воронежская область</option>
            <option value="2134">Донецкая Народная Республика</option>
            <option value="1941">Еврейская АО</option>
            <option value="1192">Забайкальский край</option>
            <option value="2155">Запорожская область</option>
            <option value="1754">Ивановская область</option>
            <option value="1124">Иркутская область</option>
            <option value="1463">Кабардино-Балкарская республика</option>
            <option value="1020">Калининградская область</option>
            <option value="1859">Калужская область</option>
            <option value="1943">Камчатский край</option>
            <option value="1471">Карачаево-Черкесская Республика</option>
            <option value="1229">Кемеровская область</option>
            <option value="1661">Кировская область</option>
            <option value="1771">Костромская область</option>
            <option value="1438">Краснодарский край</option>
            <option value="1146">Красноярский край</option>
            <option value="1308">Курганская область</option>
            <option value="1880">Курская область</option>
            <option value="145">Ленинградская область</option>
            <option value="1890">Липецкая область</option>
            <option value="2173">Луганская Народная Республика</option>
            <option value="1946">Магаданская область</option>
            <option value="2019">Московская область</option>
            <option value="1061">Мурманская область</option>
            <option value="1985">Ненецкий АО</option>
            <option value="1679">Нижегородская область</option>
            <option value="1051">Новгородская область</option>
            <option value="1202">Новосибирская область</option>
            <option value="1249">Омская область</option>
            <option value="1563">Оренбургская область</option>
            <option value="1898">Орловская область</option>
            <option value="1575">Пензенская область</option>
            <option value="1317">Пермский край</option>
            <option value="1948">Приморский край</option>
            <option value="1090">Псковская область</option>
            <option value="1422">Республика Адыгея</option>
            <option value="1216">Республика Алтай</option>
            <option value="1347">Республика Башкортостан</option>
            <option value="1118">Республика Бурятия</option>
            <option value="1424">Республика Дагестан</option>
            <option value="1434">Республика Ингушетия</option>
            <option value="1553">Республика Калмыкия</option>
            <option value="1077">Республика Карелия</option>
            <option value="1041">Республика Коми</option>
            <option value="2114">Республика Крым</option>
            <option value="1620">Республика Марий Эл</option>
            <option value="1556">Республика Мордовия</option>
            <option value="1174">Республика Саха (Якутия)</option>
            <option value="1475">Республика Северная Осетия-Алания</option>
            <option value="1624">Республика Татарстан</option>
            <option value="1169">Республика Тыва</option>
            <option value="1187">Республика Хакасия</option>
            <option value="1530">Ростовская область</option>
            <option value="1704">Рязанская область</option>
            <option value="1586">Самарская область</option>
            <option value="1596">Саратовская область</option>
            <option value="1960">Сахалинская область</option>
            <option value="1261">Свердловская область</option>
            <option value="1103">Смоленская область</option>
            <option value="1481">Ставропольский край</option>
            <option value="1905">Тамбовская область</option>
            <option value="1783">Тверская область</option>
            <option value="1255">Томская область</option>
            <option value="1913">Тульская область</option>
            <option value="1342">Тюменская область</option>
            <option value="1646">Удмуртская Республика</option>
            <option value="1614">Ульяновская область</option>
            <option value="1975">Хабаровский край</option>
            <option value="1368">Ханты-Мансийский АО - Югра</option>
            <option value="2209">Херсонская область</option>
            <option value="1384">Челябинская область</option>
            <option value="1500">Чеченская республика</option>
            <option value="1652">Чувашская Республика</option>
            <option value="1982">Чукотский АО</option>
            <option value="1414">Ямало-Ненецкий АО</option>
            <option value="1806">Ярославская область</option>
          </select>
        </div>
        <div className="form-group">
          <label>Размер заработной платы:</label>
          <input
            type="number"
            className="form-control"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>График работы:</label>
          <select
            className="form-control"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          >
            <option value="">Нет</option>
            <option value="fullDay">Полный день</option>
            <option value="shift">Сменный график</option>
            <option value="flexible">Гибкий график</option>
            <option value="remote">Удаленная работа</option>
            <option value="flyInFlyOut">Вахтовый метод</option>
          </select>
        </div>
        <div className="form-group">
          <label>Количество результатов на страницу:</label>
          <input
            type="number"
            className="form-control"
            value={perPage}
            onChange={(e) => setPerPage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={clickLoad}>Загрузить вакансии</button>
      </form>

      <h3 className="mt-4">Список загруженных вакансий:</h3>
      <ul className="list-group">
        {vacancies && vacancies.length > 0 ? (
          vacancies.map((vacancy) => (
            <li key={vacancy.id} className="list-group-item">
              <strong>{vacancy.job_title}</strong> - {vacancy.salary}
              <button
                className="btn btn-link"
                onClick={() => toggleDescription(vacancy.id)}
              >
                {expandedId === vacancy.id ? 'Свернуть' : 'Развернуть'}
              </button>
              {expandedId === vacancy.id && (
                <div className="requirements">
                  {vacancy.requirements}
                  <div>Работодатель: <strong>{vacancy.company}</strong></div>
                  <div>Тип занятости: <strong>{vacancy.work_format}</strong></div>
                  <form action={vacancy.url} target="_blank">
                    <button className='btn btn-link'>Перейти к вакансии</button>
                  </form>
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="list-group-item">Вакансии не найдены</li>
        )}
      </ul>
      {vacancies && vacancies.length > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
      )}
    </div>
  );
}

export default FetchVacancies;
