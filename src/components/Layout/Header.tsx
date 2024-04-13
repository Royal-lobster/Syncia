import { BsRobot } from 'react-icons/bs'

const Header = () => {
  return (
    <div>
      <h1 className="cdx-flex cdx-items-center cdx-gap-3 items-center cdx-text-5xl cdx-mb-2 dark:cdx-text-neutral-100 cdx-text-neutral-800">
        <BsRobot className="cdx-text-blue-400" />
        <span>Syncia</span>
      </h1>
    </div>
  )
}

export default Header
