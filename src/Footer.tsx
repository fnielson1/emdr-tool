export const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content flex justify-center p-2">
      <div>EMDR Tool by Frank Nielson</div>
      <div>(GNU General Public License GPL) version 3</div>
      <div>&copy; {new Date().getFullYear()}</div>
    </footer>
  );
};
