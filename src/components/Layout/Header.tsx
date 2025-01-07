import logo from '../../lib/logo'

const Header = () => {
  return (
    <div>
      <h1 className="cdx-flex cdx-items-center cdx-gap-3 items-center cdx-text-5xl cdx-mb-2 dark:cdx-text-neutral-100 cdx-text-neutral-800">
        <img src={logo} className="cdx-w-[48px] cdx-h-[48px]" />

        <span>DeepChat</span>
      </h1>
    </div>
  )
}

export default Header
