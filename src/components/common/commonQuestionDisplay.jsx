import { useDispatch, useSelector } from "react-redux";
import ShimmerButton from "../magicui/shimmer-button";
import CommonEditableAccordian from "./commonEditableAccordian";
import { useEffect, useState } from "react";
import { addQuestionAction, getQuestionsByCategoryIdAction, updateQuestionAction } from "@/redux/questionsData/middleware";
import { useParams } from "next/navigation";
import { categoriesSelector } from "@/redux/categories/categoriesSlice";
import { getCategoriesAction } from "@/redux/categories/middleware";
import { Dialog, DialogPanel, DialogTitle, Field, Input, Label, Switch, Textarea } from "@headlessui/react";
import clsx from "clsx";
import CommonTextField from "./commonTextField";
import FlipText from "../magicui/flip-text";
import CommonDropDown from "./commonDropDown";
import CommonCodeEditor from "./CommonCodeEditor";
import { authSelector } from "@/redux/auth/authSlice";
import { expirenceArray } from "@/app/utilities/requiredData";
import { questionsSelector } from "@/redux/questionsData/questionDataSlice";

const CommonQuestionDisplay = () => {
  const { categoryId, userrole } = useParams();
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  //   const {  allQuestionData } = useSelector(questionsSelector);
  const allQuestionData = useSelector((state) => state.QuestionsData)?.allQuestionData;
  const [questions, setQuestions] = useState([]);
  const loading = useSelector(questionsSelector)?.loading || false;
  const categoryList = useSelector(categoriesSelector)?.categories;
  const categorySelected = categoryList.find(
    (category) => category?._id === categoryId
  );
  const [openQuestionModal, setOpenQuestionModal] = useState(false);

// for question edit add modal
  const [isHavingCode, setIsHavingCode] = useState(false);
  const [experience, setExperience] = useState(expirenceArray[0].value);
  const [questionEntered, setQuestionEntered] = useState("");
  const [codeSnippetEntered, setCodeSnippetEntered] = useState("");
  const [answerEntered, setAnswerEntered] = useState("");
  const [selectedQuestion,setSelectedQuestion] = useState(null)




useEffect(()=>{

  if (selectedQuestion) {
    setIsHavingCode(selectedQuestion?.isHavingCode)
    setExperience(selectedQuestion?.experience)
    setQuestionEntered(selectedQuestion?.questionEntered)
    setCodeSnippetEntered(selectedQuestion?.codeSnippetEntered)
    setAnswerEntered(selectedQuestion?.answerEntered)
    setOpenQuestionModal(true)
  } else {
    setOpenQuestionModal(false)
  }
},[selectedQuestion])

  useEffect(() => {
    if (categoryId && currentUser?.userId) {
      
      dispatch(getQuestionsByCategoryIdAction({ categoryId, userId :currentUser?.userId }));
    }
  }, [categoryId,currentUser?.userId]);

  useEffect(() => {
    // console.log("allQuestionData", allQuestionData);
    if (allQuestionData) {
      setQuestions(allQuestionData);
    }
  }, [allQuestionData]);


  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  const handleSubmit = () => {
    const payload = {
      categoryId,
      isHavingCode,
      experience,
      questionEntered,
      codeSnippetEntered,
      answerEntered,
    userId :currentUser?.userId
    }
    console.log("payload entered", payload,selectedQuestion)
    if (selectedQuestion) {
      dispatch(updateQuestionAction({...payload,questionId:selectedQuestion?._id})).then((res) => {
        if (res?.payload?.status === 200 || res?.payload?.status === 201) {
          setSelectedQuestion(null)
          setOpenQuestionModal(false);
        }
      })
    }else{
      dispatch(addQuestionAction(payload)).then((res) => {
        if (res?.payload?.status === 200 || res?.payload?.status === 201) {
          setOpenQuestionModal(false);
        }
      })

    }
        
    // }))
    // setOpenQuestionModal(false);
  };
  console.log("questions", questions);
  return (
    <div className="h-full w-full border-none p-6 gap-10 ">
      <div className="grid grid-cols-2 gap-4 ">
        <h1 className="col-span-1 text-3xl font-bold text-white">
          {categorySelected?.name}
        </h1>
        <div className="col-span-1 flex justify-end items-center space-x-2">
          {userrole === "user" && (
            <ShimmerButton
              type="submit"
              onClick={() => setOpenQuestionModal(true)}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-small leading-none tracking-tight text-white dark:from-grey dark:to-grey-900/10 ">
                Add New
              </span>
            </ShimmerButton>
          )}

          <Input
            className={clsx(
              "block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            placeholder="Search"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-5 overflow-y-auto">
        {questions?.map((question) => {
          const { questionEntered, codeSnippetEntered, answerEntered, isHavingCode, experience } = question;
          return (
              <CommonEditableAccordian
                key={question?._id}
                question={questionEntered}
                answer={answerEntered}
                isHavingCode={isHavingCode}
                codeSnippetEntered={codeSnippetEntered}
                setQuestions={setQuestions}
                handleEditButton={()=>setSelectedQuestion(question)}
              />
            )
        })}
        {/* <CommonEditableAccordian /> */}
      </div>

      <Dialog
        open={openQuestionModal}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={() => setOpenQuestionModal(false)}
        __demoMode
        
        style={{width: "100dvw"}}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white "
              >
                <FlipText
                  className="text-1xl font-bold tracking-[-0.1em] text-left text-white dark:text-white md:text-2xl md:leading-[1rem] ext-base/7 font-medium text-white"
                  word={selectedQuestion ? "Edit Question"  :"Add New Question"}
                />
              </DialogTitle>

              {/* <form onSubmit={handleSubmit}> */}
              <div className="mt-4">
                <CommonDropDown
                  title="Experience"
                  name="category"

                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  // value={values.email}
                  // touched={touched.email}
                  // errors={ touched.email && errors.email}
                />
                <CommonTextField
                  title="Question"
                  name="email"
                  onChange={(e) => setQuestionEntered(e.target.value)}
                  value={questionEntered}
                  // value={values.email}
                  // touched={touched.email}
                  // errors={ touched.email && errors.email}
                />

                <Field>
                  <Label className="text-sm/6 font-medium text-white">
                    Answer
                  </Label>
                  <Textarea
                    className={clsx(
                      "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                    rows={3}
                    onChange={(e) => setAnswerEntered(e.target.value)}
                    value={answerEntered}
                  />
                </Field>
                <Field className="flex gap-4 items-center mt-3">
                  <Label className="text-sm/6 font-medium text-white">having code ?</Label>
                <Switch
                    checked={isHavingCode}
                    onChange={() => setIsHavingCode(!isHavingCode)}
                    style={{ background: "#2A3047" }}
                    className="group relative flex h-7  w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                    />
                  </Switch>
                  </Field>
                  {isHavingCode && (
                   <CommonCodeEditor language={"javascript"} value={codeSnippetEntered} onChange={(value)=>setCodeSnippetEntered(value)}/>
                  )}
                <div className="z-10 flex min-h-[1rem] pt-4 items-center justify-center">
                  <ShimmerButton
                    type=""
                    onClick={handleSubmit}
                  >
                    <span className="whitespace-pre-wrap text-center text-sm font-small leading-none tracking-tight text-white dark:from-grey dark:to-grey-900/10 ">
                     Submit
                    </span>
                  </ShimmerButton>
                </div>
              </div>
              {/* </form> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CommonQuestionDisplay;
