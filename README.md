# SMP Portfolio & Youtube Summary Card Site

- [🚀Portfolio site](#Portfolio site)
- [📢Youtube Channel](#Youtube Channel)
- [📝Summary Card](#Summary Card)

`Portfolio` & `Youtube Summary Card`는 ReactJS(Hook)를 이용하여 제작하였습니다. `Portfolio site`는 HTML과 VanillaJS로 제작하였던 프로젝트를 ReactJS로 변환하였고 `Youtube & Summary Card`는 ReactJS(Hook)로 추가 제작하였습니다.

<br>

## Version

`smpark.dev`_(v1.0.0)_

<br>

## IDE

<img alt="vscode" src ="https://img.shields.io/badge/VSCode-v1.57-007ACC.svg?&flat&logo=appveyor&logo=VisualStudioCode&logoColor=white"/> <img alt="ReactJS" src ="https://img.shields.io/badge/ReactJS-v17.0.2-5ed3f3.svg?&flat&logo=appveyor&logo=ReactJS&logoColor=white"/> <img alt="Netlify" src ="https://img.shields.io/badge/Netlify-v3.37.37-38adbb.svg?&flat&logo=appveyor&logo=Netlify&logoColor=white"/> <img alt="Firebase" src ="https://img.shields.io/badge/Firebase-v4.4.6-f5820c.svg?&flat&logo=appveyor&logo=Firebase&logoColor=white"/> <img alt="Cloudinary" src ="https://img.shields.io/badge/Cloudinary-v1.26.1-3448c5.svg?&flat&logo=appveyor&logo=Cloudinary&logoColor=white"/>

- **Tool** - `VSCode`_(v1.57)_
- **Front End** - `ReactJS(Hook)`_(v17.0.2)_
- **Deploy** - `Netlify-cli`_(v3.37.37)_
- **Data Base** - `Firebase`_(v8.6.8)_
- **Image Storage** - `Cloudinary`_(v1.26.1)_

<br>

## Portfolio site

저를 소개하기 위한 포트폴리오 페이지입니다.  
모든 기능은 직접 제작하였으며 우주 컨셉으로 디자인하였습니다.

#### Introduce

- **배경**  
  Interactive Developer 유튜브를 보고 감명을 받아, 처음으로 `Canvas`를 사용하여 배경 이미지를 만들어 보았습니다. 랜덤 값을 통해 별을 찍고 별똥별을 만들어 떨어트리는 기능을 제작하였습니다.  
  Build pattern을 사용하여 쉽게 별의 숫자와 크기, 별똥별의 크기 등을 조절하기 쉽게 하였습니다.

  ```javascript
  export default class StarryNight {
    draw(canvas) {
      new MilkyWayBuilder() //
        .starCount(5)
        .starSize(5)
        .build(canvas);

      new ShootingStarBuilder() //
        .starSize(8)
        .build(canvas);
    }
  }
  ```

- **메뉴**  
  현재 View의 위치에 따라 메뉴 이펙트가 변하고, 클릭을 통해 해당 섹션으로 이동하는 기능을 만들었습니다. 최초에는 스크롤 이벤트를 통해 처리했지만, 성능을 생각하여 `Interactive Observer API`를 사용하는 방식으로 바꾸었습니다.

  ```javascript
  _callback(onObserveTarget) {
    return (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
          this._setElementByObserve(
            onObserveTarget,
            entry.target,
            entry.boundingClientRect.y
          );
        } else if (entry.isIntersecting && entry.intersectionRatio > 0) {
          this._setElementByObserve(onObserveTarget, entry.target);
        }
      });
    };
  }
  ```

- **가이드**  
  `Portfolio site`의 현재 View 위치를 간접적으로 알려주는 우주선 가이드 기능을 만들었습니다. 스크롤 이동을 통한 px의 비율을 가로축의 px로 변환하여 우주선을 이동시킵니다.

  ```javascript
  _render(element) {
    return (e) => {
      const rocket = element.childNodes[1];
      const currHeight = this.portfolio.scrollTop;

      const distance = getRocketMoveDistancePixel(element, this.portfolio);

      const rotate = getRocketRotate(this.prevHeight, currHeight);

      rocket.style.transform = `translateX(${distance}px) ${rotate}`;

      // 이전 높이 업데이트
      if (currHeight > 0) this.prevHeight = currHeight;
    };
  }
  ```

- **구현**  
  🚀[**smpark.dev**](https://smpark.dev)에서 확인하실 수 있습니다.

<br>

## Youtube Channel

개발자가 추천한 유튜브 리스트를 시청 및 저장하거나 직접 유튜브를 검색 및 저장 할 수 있는 사이트입니다.  
로그인을 통해서 이용할 수 있습니다.

#### Introduce

- **유튜브**  
  `Youtube API`에서 제공하는 영상 데이터를 통해 제가 추천한 영상 리스트를 볼 수 있고 직접 유튜브를 통해 검색 할 수 있는 기능입니다. 다만 유튜브 정책으로 그 횟수(Point)가 정해져 있으며 해당 횟수를 넘으면 이용할 수 없습니다.

  ```javascript
  async search(query, pageToken, maxResults = 25) {
    const data = {
      params: {
        part: 'snippet',
        q: query,
        maxResults,
        type: 'video',
      },
    };

    if (pageToken === 'none' || !pageToken) return;

    data.params.pageToken = pageToken;

    try {
      const response = await this.youtube.get('search', data);

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  ```

- **리스트**  
  리스트는 `Search`, `My List`, `Smpark's Picks`, `ETC`로 이루어져 있습니다.  
  데이터의 수를 25개로 고정하여 일정한 로딩 시간을 유지합니다.  
  `SMP Chat`에서 마우스 이벤트로 Scroll Load 기능을 구현했다면, 해당 프로젝트에서는 `Interactive Observer API`로 구현하였습니다.  
  웹 스토리지를 통해 현재 바라보고 있는 리스트를 저장하여 보여줌으로써 유튜브에서 제공하는 API Point를 절약합니다.  
  유저의 액션에 따라 리스트가 활성화되어 해당 리스트를 보여줍니다.

  ```javascript
  _callback() {
    return (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (this.id === 'smpark') {
            loadNextSmparkList(
              this.youtube,
              this.token,
              this.onYoutubeLayerSet
            );
          } else if (this.id === 'search') {
            loadNextSearchList(
              this.youtube,
              this.token,
              this.onYoutubeLayerSet,
              this.query
            );
          }

          observer.disconnect();
        }
      });
    };
  }

  ```

- **로그인**  
  Youtube와 Summary Card 기능은 로그인 후 이용이 가능합니다.
  로그인은 `Firebase`를 이용하여 처리합니다.  
  `Google`, `Github`를 통한 로그인과 `SMP Oauth Server`를 이용한 로그인이 가능합니다.  
  특히 `SMP Oauth Login`은 Oauth 2.0으로 받아온 유저 정보를 `Firebase`에서 지정한 방식으로 토큰화하여 넘겨줌으로써 연동되며, 로그인 및 로그아웃, 계정 관리 등 `Firebase`에서 다른 로그인 방식과 마찬가지로 일괄적으로 처리 및 관리가 가능합니다.

  ```javascript
  const userData = resourceRes.data.userData;

  const loginToken = jwt.sign(
    {
      iss: process.env.REACT_APP_FIREBASE_JWT_ACOUNT_EMAIL,
      sub: process.env.REACT_APP_FIREBASE_JWT_ACOUNT_EMAIL,
      aud: 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      uid: userData.username,
    },
    process.env.REACT_APP_FIREBASE_JWT_SECRET_KEY,
    { algorithm: 'RS256' }
  );

  userData.token = loginToken;

  return userData;
  ```

- **구현**  
  🚀[**smpark.dev/study**](https://smpark.dev/study)에서 확인하실 수 있습니다.
  <br>

## Summary Card

최근 유튜브를 통해 많고 다양한 양질의 정보를 얻을 수 있기 때문에 이를 이용하여 스터디 할 수 있는 페이지를 만들었습니다.  
`My List`에 저장한 유튜브 영상을 클릭 후 카드 작성을 통해 이용할 수 있으며, 영상의 정보를 이용자가 간략하게 정리하고 볼 수 있는 기능입니다.  
`TOAST UI Editor`를 사용하여 작성 시의 편의성을 높였습니다. 이미지는 `Cloudinary`에 저장되며 카드 내용은 `Firebase`를 통해 실시간 저장됩니다.

#### Introduce

- **이미지 업로드**  
  그동안은 SSR 방식의 개발로 이미지 파일은 BE를 통해 서버 폴더에 저장했습니다.  
  이번에 CSR 방식으로 개발해 보면서 이미지를 저장하기 위해 `Cloudinary`를 이용하였습니다.

  ```javascript
  async imageUpload(file) {
    const data = new FormData();

    data.append('file', file);
    data.append(
      'upload_preset',
      `${process.env.REACT_APP_CLOUDINARY_CLOUD_UNSIGNED_NAME}`
    );

    try {
      const response = await this.cloudinary.post('upload', data);

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  ```

<br>

- **실시간 저장**  
  요약 카드는 `Firebase`의 `Realtime Database` 기능을 통해 실시간으로 내용이 저장되어 작성 중인 데이터가 훼손되지 않도록 하였습니다.

  ```javascript
  saveCard(userId, videoId, card) {
    firebaseDatabase
      .ref(`${userId}/summaryCard/${videoId}/${card.id}`)
      .set(card);
  }

  deleteCard(userId, videoId, card) {
    firebaseDatabase
      .ref(`${userId}/summaryCard/${videoId}/${card.id}`)
      .remove();
  }

  readCard(userId, videoId, cb) {
    firebaseDatabase
      .ref(`${userId}/summaryCard/${videoId}`)
      .on('value', (snapshot) => {
        cb(snapshot.val());
      });
  }

  readCardList(userId, cb) {
    firebaseDatabase
      .ref(`${userId}/summaryCard/`)
      .on('value', (snapshot) => cb(snapshot.val()));
  }
  ```

<br>

- **편의 기능**  
  요약 카드가 작성된 목록의 데이터를 구별하기 위해서 `Bookmark` 기능을 만들었습니다. 작성 시 자동으로 생성되며 색상을 선택할 수 있습니다.  
  또한, 카드를 작성하는 유저에게 편의성을 제공하기 위하여 `TOAST UI Editor`를 추가하였고 `TOAST`에서 제공하는 `color-pick`, `table-merge` 등을 추가로 적용하였습니다.
  ```javascript
  import { Editor } from '@toast-ui/react-editor';
  import 'codemirror/lib/codemirror.css';
  import '@toast-ui/editor/dist/toastui-editor.css';
  import 'tui-color-picker/dist/tui-color-picker.css';
  import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
  import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
  ```
  ```html
  <div className="{styles.editor}">
    <Editor
      className="{styles.toastEditor}"
      previewStyle="tab"
      height="250px"
      previewHighlight="{false}"
      initialEditType="wysiwyg"
      useCommandShortcut="{true}"
      usageStatistics="{false}"
      hideModeSwitch="{true}"
      plugins="{[colorSyntax,"
      tableMergedCell]}
      ref="{editorRef}"
      onChange="{onContentsChange}"
    />
  </div>
  ```
- **구현**  
  🚀[**smpark.dev/study**](https://smpark.dev/study)에서 `요약 카드`를 클릭 시 확인하실 수 있습니다.

<br>

#### End Comment

`smpark` - 이번에 작성된 3가지의 프로젝트는 모두 ReactJS를 이용하여 제작되었습니다.  
처음 ReactJS를 활용하는 만큼 어려움이 있었지만 VanillaJS를 통한 프로젝트 제작보다 훨씬 더 간결하고 편함을 느낄 수 있었습니다.  
document의 직접적인 제어의 배제, component의 재활용을 위한 설계 및 제작, 최적화 등을 생각하며 제작하였습니다.  
이번 프로젝트에서는 Hook을 사용하고 프로젝트의 규모도 크지 않음으로 상태관리 라이브러리를 사용하지 않았지만 다음에는 사용해보고 싶고, 개인적인 시간 문제로 JEST 같은 테스트 유닛을 사용해보지 못한 것이 아쉬움으로 남습니다.  
Read me는 여기까지입니다.  
읽어주셔서 감사합니다.
