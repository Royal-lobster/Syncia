import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { quickMenuOptions } from "@src/data/quickMenuOptions";
import { RxMagnifyingGlass } from "react-icons/rx";

export const QuickMenuOptions = () => {
  console.log("quickMenuOptions");
  return (
    <DropdownMenu.Group className="flex flex-col space-y-2">
      {quickMenuOptions.map((section) => (
        <div key={section.sectionName}>
          <DropdownMenu.Label className="font-semibold">
            {section.sectionName}
          </DropdownMenu.Label>
          <DropdownMenu.Group className="flex flex-col space-y-2">
            {section.items.map((item) => (
              <DropdownMenu.Item key={item.name}>
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-400 h-full p-1">
                    <RxMagnifyingGlass size={18} />
                  </div>
                  <div className="px-2 py-1">{item.name}</div>
                </div>
                {/* {item.items && <QuickMenuOptions />} */}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
        </div>
      ))}
    </DropdownMenu.Group>
  );
};
