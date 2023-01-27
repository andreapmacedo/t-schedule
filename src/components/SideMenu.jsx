export default function SideMenu(props) {
  return (
    <>
      <h1>SideMenu</h1>
      {console.log(props.menuItem.length)}
      {props.menuItem.map((item) => {
        return (
          <div key={item.title}>
          <h3>{item.title}</h3>
          </div>
        )}
      )}
    </>
  );
}