import { Head } from "../layout/Head";
import { componentStyles } from "../styles/style.css";

const Confirm = () => {
  return (
    <>
      <Head title="StockTube | メールを確認してください" />
      <h2 class={componentStyles.heading}>メールを確認してください</h2>
    </>
  );
};

export default Confirm;
