import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import CommonCodeEditor from './CommonCodeEditor'
import { PencilIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function CommonEditableAccordian(props) {
  const { question, answer,isHavingCode,codeSnippetEntered, handleEditButton } = props
  const [open, setOpen] = useState(false)
  return (
    <div className="h-full w-full  px-4">
      <div className="w-full  divide-white/5 rounded-xl bg-white/5">
        <Disclosure as="div" className="p-6" defaultOpen={false}  >
          <div className='flex w-full'>
          <div className='flex w-full items-center justify-between flex-1 pr-3' >

            <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
              {question} ?
            </span>
            <PencilIcon className="size-5 fill-white/60 z-10" onClick={handleEditButton} />
          </div>
          <DisclosureButton className="group flex  items-center justify-between" >
            <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
          </DisclosureButton>
          </div>
          <DisclosurePanel className="mt-2 text-sm/5 text-white/50" >
          
          {isHavingCode ? <div className="mt-2  flex flex-col gap-4">
              {answer}
            <CommonCodeEditor language="javascript" value={codeSnippetEntered} height={300}  />
          </div>: answer}
            {/* {answer} */}
          </DisclosurePanel>
        </Disclosure>
       
      </div>
    </div>
  )
}