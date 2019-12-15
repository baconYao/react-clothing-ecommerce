import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

// 為什麼這裡要帶 state 參數？ 為了做 "inverse" (比較 collection-overview.container.jsx 的寫法)
// 因為 selectIsCollectionsLoaded 是一個 function，如果直接 !selectIsCollectionsLoaded 的話
// 等於 !function，永遠都會是 false(除非你的selectIsCollectionsLoaded 回傳 falsy value)，但
// createStructuredSelector 期望要輸入 function type，所以會出錯。
// 也就是應該要 isLoading: function type input。若 isLoading: !selectIsCollectionsLoaded，
// 則非 function type input，會出錯 (不能直接在這裡加 ! 來做 inverse)。

// 在使用 createStructuredSelector 時，會自動帶入 state 參數，因此在 collection-overview.container.jsx
// 我們不會看到 state當成參數傳入(已自動被帶入)。
// 但在這裡，因為我們要傳一整個 function 作為 isLoading 的標準輸入 ，
// 也就是 (state => !selectIsCollectionsLoaded(state)) 作為一個 function 傳入，
// 因此 selectIsCollectionsLoaded 就無法吃到自動帶入的 state，
// 所以我們需要自己傳入 state 參數給 selectIsCollectionsLoaded。
// state 參數是 mapStateToProps 給予的，但 createStructuredSelector 會將它自動 pass 給 selector(可以
// 參考 collection-overview.container.jsx，它就是被自動帶入 state)
// 
// ref: https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15221888#questions/8004528
const mapStateToProps = createStructuredSelector({
  isLoading: (state => !selectIsCollectionsLoaded(state))
});

// 等同於 export const CollectionPageContainer = connect(mapStateToProps)(WithSpinner(CollectionPage))
const CollectionPageContainer = compose(
  connect(mapStateToProps), // 這裡會自動帶入 props 到下一層的component，也就是我們自訂的 WithSpinner
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;