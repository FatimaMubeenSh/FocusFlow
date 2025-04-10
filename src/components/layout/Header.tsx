import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className="bg-white shadow p-4 sticky top-0 z-10 flex">
      <img src={logo} alt="FocusFlow Logo" className="h-9 mr-2" />
      <h1 className="text-2xl font-bold">
        <span>Focus</span>
        <span className="text-purple-500">Flow</span>
      </h1>
    </header>
  );
}

export default Header;
