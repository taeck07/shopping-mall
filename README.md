## Start project

Install

```
npm install
```

front-end start

```
npm run start
```

server start

```
npm run api
```

<br/><br/>

## 사용 기술

| 사용기술                                                                                                                                   | 선정이유                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| ![React Query](https://img.shields.io/badge/React_Query-FF4154.svg?style=for-the-badge&logo=react-query&logoColor=white)                   | 서버 상태(로딩, 에러 등)를 관리 하기 위해 사용 |
| ![Styled Components](https://img.shields.io/badge/styled_components-DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white) | 스타일링을 위해 사용                           |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)                      | 정적 타입 분석을 위해 사용                     |
| ![JSON SERVER](https://img.shields.io/badge/Json_Server-000000.svg?style=for-the-badge&logo=jsonserver&logoColor=white)                    | 필터를 위한 Json server 서버 사용              |

<br/><br/>

### 과제 수행시 고민한 내용

- 검색 & 필터 구현

  - 검색과 필터의 구분  
     필터와 검색이 구분되어 있어 이 부분에 대한 구현이 고민되었습니다.  
     검색의 경우 브랜드 명과 상품명이 함께 고려되어야하는데 필터의 경우 조건에 부합하는지 아닌지 만을 판단하면 되었기 때문에 함께 구현할 수 있을지 고민되었습니다.  
     고민 끝에 검색과 필터를 따로 구현하였습니다.  
     기재된 api 로 구현도 가능하였지만 현재 보여지는 목록 안에서만 필터될 경우 목록이 없을 경우가 많을 것 같아 json-server 사용을 결정하였습니다.

  - 검색  
     입력을 받을때마다 키워드 검색을 하는 것은 비용이 많이드는 행위로 debounce 를 사용하였습니다.  
     json-server로 OR 검색을 하는데 어려움이 있어 검색의 경우 현재 조회된 목록안에서 키워드 검색, 검색된 목록을 나타내게 됩니다.  
     키워드 검색시 브랜드와 상품명 둘을 검색하게 되는데 무신사 앱을 참고하여 브랜드와 상품명을 분리하여 검색 가능하게 하였습니다.
  - 필터  
     필터는 목록을 받아 선택된 필터 목록만 반환하는 형식으로 개발하였습니다.

- 에러 이미지 & 이미지 지연 로딩

  - 이미지 지연 로딩  
     Intersection Observer API 를 사용하여 lazy loading을 구현하였습니다.

  - 에러 이미지  
     lazy loading과 함께 구현하기 위해 디폴트 이미지로 두었고 에러가 발생하지 않을시 원래 이미지로 나타나는 방식으로 구현하였습니다.

<br/>

### 개선할 점

- 에러 핸들링  
   리액트쿼리의 onError를 이용하여 토스트 메시지를 띄우도록 처리하였으나 리액트쿼리의 useErrorBoundary를 사용하여 에러처리를 할 수 있도록 개선할 수 있다.

- 보이지 않는 부분 랜더링 하지 않게 수정  
   무한 스크롤에서 보이지 않는 컴포넌트를 lazy loading에 사용한 Intersection Observer API 를 사용하여 렌더링 하지 않도록 하여 렌더링 비용을 줄일 수 있습니다.
