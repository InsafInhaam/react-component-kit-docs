"use client";

import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Modal,
  Pagination,
  RadioGroup,
  Select,
  Tabs,
  Textarea,
  Tooltip,
} from "@insafinhaam732/react-component-kit";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaArrowRight } from "react-icons/fa";
import { Slider } from "@/components/Slider/Slider";

export default function ComponentShowcase() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [plan, setPlan] = useState("");
  const [date, setDate] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [theme, setTheme] = useState("dark");

  const CodeBlock = ({ code }: { code: string }) => (
    <SyntaxHighlighter
      language="tsx"
      style={theme === "dark" ? vscDarkPlus : vs}
    >
      {code}
    </SyntaxHighlighter>
  );

  return (
    <div
      className={`min-h-screen px-4 py-10 ${
        theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-6xl m-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🎨 Component Library Showcase</h1>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2 border rounded-md"
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">🖱️ Button</h2>
          <Button label="Click Me" endIcon={<FaArrowRight />} />
          <CodeBlock
            code={`<Button label="Click Me" endIcon={<FaArrowRight />} />`}
          />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">📄 Pagination</h2>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <CodeBlock
            code={`<Pagination currentPage={currentPage} totalPages={10} onPageChange={(page) => setCurrentPage(page)} />`}
          />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">📝 Modal</h2>
          <Button label="Open Modal" onClick={() => setShowModal(true)} />
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <h3 className="text-xl font-bold">Hello from Modal!</h3>
            <p>This is modal content.</p>
          </Modal>
          <CodeBlock
            code={`<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
<h3>Hello from Modal!</h3>
<p>This is modal content.</p>
</Modal>`}
          />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">🔘 Radio Group</h2>
          <RadioGroup
            label="Choose a plan"
            name="plan"
            value={plan}
            onChange={setPlan}
            options={[
              { label: "Free", value: "free" },
              { label: "Pro", value: "pro" },
              { label: "Enterprise", value: "enterprise" },
            ]}
          />
          <CodeBlock
            code={`<RadioGroup label="Choose a plan" name="plan" value={plan} onChange={setPlan} options={[{ label: 'Free', value: 'free' }, { label: 'Pro', value: 'pro' }, { label: 'Enterprise', value: 'enterprise' }]} />`}
          />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">☑️ Checkbox</h2>
          <Checkbox
            label="I accept the terms and conditions"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <CodeBlock
            code={`<Checkbox label="I accept the terms and conditions" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />`}
          />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">📅 Date Picker</h2>
          <DatePicker label="Select date" value={date} onChange={setDate} />
          <CodeBlock
            code={`<DatePicker label="Select date" value={date} onChange={setDate} />`}
          />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">📅 Input Fields</h2>
          <Input
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            required
            iconLeft={<i className="bx bx-envelope" />}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error="Password is required"
            iconRight={<i className="bx bx-lock" />}
          />

          <CodeBlock
            code={`<Input
label="Email"
type="email"
placeholder="example@gmail.com"
required
iconLeft={<i className="bx bx-envelope" />}
/>

<Input
label="Password"
type="password"
placeholder="Enter your password"
error="Password is required"
iconRight={<i className="bx bx-lock" />}
/>`}
          />
        </section>

        <br />

        <Slider
          autoPlay
          autoPlayInterval={5000}
          showArrows
          showDots
          animationType="fade"
          infinite
        >
          <img src="/images/home-main.webp" alt="Slide 1" />
          <img src="/images/image1.png" alt="Slide 2" />
          <img src="/images/image2.png" alt="Slide 3" />
        </Slider>
      </div>
    </div>
  );
}
