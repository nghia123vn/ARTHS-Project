import { NavLink } from "react-router-dom";
import { roleAdmin, roleOwner, roleTeller } from '../constants/linkRole';
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

type Props = {
  role: string
}

const SiderBar = ({ role }: Props) => {
  const chooseRole = role === "Admin" ? roleAdmin : role === "Teller" ? roleTeller : role === "Owner" ? roleOwner : [];
  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({});
  useEffect(() => {
    // Kiểm tra xem mục nào trong submenu khớp với location.pathname
    for (let index = 0; index < chooseRole.length; index++) {
      const item = chooseRole[index];
      if (item.subMenu) {
        for (let subIndex = 0; subIndex < item.subMenu.length; subIndex++) {
          const submenu = item.subMenu[subIndex];
          if (window.location.pathname.startsWith(submenu.to)) {
            setOpenMenus({ ...openMenus, [index]: true });
            break;
          }
        }
      }
    }
  }, [chooseRole]);
  const toggleMenu = (index: number) => {
    // Sao chép một bản sao mới của openMenus
    const newOpenMenus = { ...openMenus };

    if (newOpenMenus[index]) {
      // Nếu menu đã mở, đóng nó
      newOpenMenus[index] = false;
    } else {
      // Nếu menu chưa mở, đóng tất cả các menu khác
      for (const key in newOpenMenus) {
        if (key !== index.toString()) {
          newOpenMenus[key] = false;
        }
      }
      // Mở menu đã chọn
      newOpenMenus[index] = true;
    }
    setOpenMenus(newOpenMenus);
  };

  return (
    <div className="w-full h-full py-5 flex flex-col items-center">
      <h1 className="text-main text-[27px] font-semibold pb-3">Thanh Huy Store</h1>
      <div className="pt-3 w-full">
        {chooseRole.map((item, index) => (
          <div key={index} className="w-full flex justify-center p-3 font-bold">
            {item.subMenu ? (
              <div className="w-full">
                <div
                  className=
                  {`w-full flex justify-between  pl-5 pr-2 text-start py-3 cursor-pointer 
                    ${openMenus[index] || item.subMenu.some(submenu => window.location.pathname.startsWith(submenu.to))
                      ? "text-white bg-main rounded-md"
                      : "hover:text-main text-[#757575]"}`}
                  onClick={() => toggleMenu(index)}
                >
                  <p>{item.name}</p>
                  <ChevronDownIcon className="w-5 h-5" />
                </div>
                {openMenus[index] && (
                  <div className="w-full flex flex-col space-y-3 pt-5 px-5">
                    {item.subMenu.map((submenu, subIndex) => (
                        <NavLink
                        key={subIndex}
                          to={submenu.to}
                          className={({ isActive }) =>
                            `w-full text-start p-3
                              ${isActive ? "text-white bg-main rounded-md" : "hover:text-main text-[#757575]"}`
                          }
                        >
                          {submenu.name}
                        </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                onClick={() => {
                  setOpenMenus({});
                }}
                to={item.to}
                className={({ isActive }) =>
                  `w-full text-start pl-5 py-3
                    ${isActive
                    ? "text-white bg-main rounded-md"
                    : "hover:text-main text-[#757575]"}`
                }
              >
                {item.name}
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SiderBar;
