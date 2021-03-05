## pages

### home page

#### component state

-  `initialStage` indicates that it is the beginning stage of loading the page.

- `mainData`: the main data to be displayed in this page

  - `isResponse`: if the server throws any exception (`false`), `true` = everything goes well.

  - `isValid`: at least we get `ResponseEntity.ok(ResponseBody)` from the server; `true`: if the `result` is not `null`.

  - `error`: error from server or from `ResponseEntity`.

  - `content`: main content to be displayed if everything goes well.

  - logic hierarchy:

    |              | `isResponse` | `isValid` |
    | ------------ | ------------ | --------- |
    | server error | false        | false     |
    | fetch error  | true         | false     |
    | goes well    | true         | true      |



#### UI snippet rendering with `state`

| flags           | `mainContent` | `buttonSeries` | `render()` |
| --------------- | ------------- | -------------- | ---------- |
| `initialStage`  | √             | √              | √          |
| `isServerWorks` |               |                | √          |
| `isEmptyToken`  |               | `isTokenWorks` |            |
| `isTokenWorks`  |               | √              |            |
| `isResponse`    | `isValid`     |                |            |
| `isValid`       | √             |                |            |
| `role`          |               | √              |            |



- `mainContent` :
  - render after `initialStage`.
  - check if `mainData.isValid` is true, if not, display `noPermissionPage`.
  - don't care about `token`. 
  - don't care about `isServerWorks`, if it is down, the `render` will handle that.
- `buttonSeries`:
  - render after `initialStage`.
  - need to check the `isTokenWorks`, if not show nothing, if true, then
  - check the `role` if customer, or if owner
  - don't care about `mainData`.
  - don't care about `isServerWorks`, if it is down, the `render` will handle that.
- `render()`:
  - render after `initialStage`.
  - need to check `isServerWorks`, if not display `noPermissionPage`.
  - don't care about anything else, if other situation happens, `mainContent` and `buttonSeries` will handle with.

 

#### network

- `initialStage` is true, the waiting page will be displayed.
- in `componentDidMount` `CheckTokenInFirstLoad` finish checking and upload the global `state`.
- In `componentDidMount`  check the `isServerWorks` then begin to fetch shop list from the server to populate `mainData`, once the server responses, the `initialStage` switch to false. If `isServerWorks` is false, don't fetch shop list and set `initialStage` to false.
- re-render all UI snippet



### shop list page

#### component state

- `initialStage` indicates that it is the beginning stage of loading the page.

- `mainData`: the main data to be displayed in this page

  - `isResponse`: if the server throws any exception (`false`), `true` = everything goes well.

  - `isValid`: we get `ResponseEntity.ok(ResponseBody)` from the server, `true`: if the `result` is not `null`

  - `error`: error from server or from `ResponseEntity`

  - `content`: main content to be displayed if everything goes well

  - logic hierarchy:

    |              | `isResponse` | `isValid` |
    | ------------ | ------------ | --------- |
    | server error | false        | false     |
    | fetch error  | true         | false     |
    | goes well    | true         | true      |

#### UI snippet rendering with `state`

| flags           | `mainContent`  | `buttonSeries` | `render()` |
| --------------- | -------------- | -------------- | ---------- |
| `initialStage`  | √              | √              | √          |
| `isServerWorks` |                |                | √          |
| `isEmptyToken`  | `isTokenWorks` |                |            |
| `isTokenWorks`  | √              |                |            |
| `isResponse`    | `isValid`      |                |            |
| `isValid`       | √              |                |            |
| `role`          | √              |                |            |

- `mainContent` : 
  - render after `initialStage`.
  - if `isTokenWorks` is false display `NopermissionPage`
  - else if `isValid` is false display `NopermissionPage`, if is true then
  - if `role` is not owner, show `NoPermissionPage` saying only owner can access.
  - else display the shop list
  - don't care about `isServerWorks`, if it is down, the `render` will handle that.

- `buttonSeries`: 
  - render after `initialStage` finishing.
  - don't care about `isServerWorks`, if it is down, the `render` will handle that.
  - any other situation, just display since only "back to home" button shows.

- `HeaderAndDrawer`: 
  - in the `initialStage`, display `loadingDataPage`, 
  - if `isServerWorks` return false, display `NoPermissionPage`. else display `HeaderAndDrawer`.

#### network

- `initialStage` is true, the waiting page will be displayed.
- in `componentDidMount` `CheckTokenInFirstLoad` finish checking and upload the global `state`.
- In `componentDidMount`  check the `isServerWorks` . If `isServerWorks` is false, don't fetch shop list and set `initialStage` to false. if it is true, then
- In `componentDidMount` check `isTokenWorks` and `role` first before beginning to fetch shop list from the server to populate `mainData`. if `isTokenWorks` and `role` is owner, fetch data, else: set `initialStage` to false.
- re-render all UI snippet.

## global

### state

#### token

- `verification`

  - `isServerWorks`: check if server works well

  - `isEmptyToken`: if the token is empty

  - `isTokenWorks`: if the token pass the valid

  - logic hierarchy:

    |               | `isServerWorks` | `isEmptyToken` | `isTokenWorks` |
    | ------------- | --------------- | -------------- | -------------- |
    | server down   | false           | false          | false          |
    | token invalid | true            | false          | false          |
    | no token      | true            | true           | false          |
    | well          | true            | false          | true           |

    

- `userInfo`

  - `username`
  - `email`
  - `role`

- `error`

  - `serverError`: error from the server
  - `tokenError`: token is invalid anymore.



### UI snippet

#### `HeaderAndDrawer`

| flags           | `render()`     | `loginAndRegisterInDrawer` | `profileTableInDrawer` |
| --------------- | -------------- | -------------------------- | ---------------------- |
| `isServerWorks` |                |                            |                        |
| `isEmptyToken`  | `isTokenWorks` |                            |                        |
| `isTokenWorks`  | √              |                            |                        |

- `loginAndRegisterInDrawer`
  - nothing to do with `global state`
- `profileTableInDrawer`
  - need to access to `userInfo`
- `render`
  - don't care about `isServerWorks`. Other `Router Component` will care about this.
  - if `isTokenWorks` is false, display `loginAndRegisterInDrawer`.
  - else display `profileTableInDrawer`.