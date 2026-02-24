"use client";
import { savePageLinks } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import SectionBox from "@/components/layout/SectionBox";
import { upload } from "@/libs/upload";
import {
  faCloudArrowUp,
  faGripLines,
  faLink,
  faFile,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";

export default function PageLinksForm({ page, user }) {
  const [links, setLinks] = useState(page.links || []);
  const [isIconLoading, setIsIconLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsIconLoading(false);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timeoutId);
  }, []);

  async function save() {
    await savePageLinks(links);
    toast.success("Saved!");
  }

  function addNewLink() {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  }

  function handleUpload(ev, linkKeyForUpload) {
    upload(ev, (uploadedImageUrl) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link, index) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  }

  function handleFileUpload(ev, linkKeyForUpload) {
    upload(ev, (uploadedFileUrl) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link) => {
          if (link.key === linkKeyForUpload) {
            link.url = uploadedFileUrl;
            link.isFile = true;
          }
        });
        return newLinks;
      });
    });
  }

  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
          if (prop === "url") {
            link.isFile = false;
          }
        }
      });
      return newLinks;
    });
  }

  function removeLink(linkKeyToRemove) {
    setLinks((prevLinks) =>
      [...prevLinks].filter((l) => l.key !== linkKeyToRemove)
    );
  }

  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4 text-slate-50">Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-indigo-400 text-lg flex gap-2 items-center cursor-pointer hover:text-indigo-300"
        >
          {isIconLoading ? (
                  <div className="animate-pulse bg-gray-300 w-4 h-4 rounded-full" />
                ) : (
          <FontAwesomeIcon
            className="bg-blue-500 text-white p-1 rounded-full aspect-square"
            icon={faPlus}
          />
          )}
          <span>Add new</span>
        </button>
        <div className="">
          <ReactSortable handle={".handle"} list={links} setList={setLinks}>
            {links.map((l) => (
              <div key={l.key} className="mt-8 md:flex gap-6 items-center">
                <div className="handle">
                {isIconLoading ? (
                  <div className="animate-pulse bg-gray-300 w-4 h-4 rounded-full" />
                ) : (
                  <FontAwesomeIcon
                    className="text-gray-500 mr-2 cursor-ns-resize"
                    icon={faGripLines}
                  />
                )}
                </div>
                <div className="text-center">
                  <div className="bg-slate-800 relative aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center rounded-full border border-slate-700">
                    {l.icon && (
                      <Image
                        className="w-full h-full object-cover"
                        src={l.icon}
                        alt={"icon"}
                        width={64}
                        height={64}
                      />
                    )}
                    {!l.icon && (isIconLoading ? (
                      <div className="animate-pulse bg-gray-400 w-4 h-4 rounded-full" />
                    ) : (
                      <FontAwesomeIcon size="xl" icon={l.isFile ? faFile : faLink} />
                    ))}
                  </div>
                  <div>
                    <input
                      onChange={(ev) => handleUpload(ev, l.key)}
                      id={"icon" + l.key}
                      type="file"
                      className="hidden"
                    />
                    <label
                      htmlFor={"icon" + l.key}
                      className="border border-slate-700 mt-2 p-2 flex items-center gap-1 text-slate-200 cursor-pointer mb-2 justify-center rounded-md hover:bg-slate-800 hover:text-slate-50"
                    >
                      {isIconLoading ? (
                        <div className="animate-pulse bg-gray-400 w-4 h-4 rounded-full" />
                      ) : (
                        <FontAwesomeIcon icon={faCloudArrowUp} />
                      )}
                      <span>Change icon</span>
                    </label>
                    <button
                      onClick={() => removeLink(l.key)}
                      type="button"
                      className="w-full bg-slate-800 py-2 px-3 mb-2 h-full flex gap-2 items-center justify-center rounded-md hover:bg-red-500 hover:text-white cursor-pointer border border-slate-700"
                    >
                      {isIconLoading ? (
                        <div className="animate-pulse bg-gray-400 w-4 h-4 rounded-full" />
                      ) : (
                        <FontAwesomeIcon icon={faTrash} />
                      )}
                      <span>Remove this link</span>
                    </button>
                  </div>
                </div>
                <div className="grow">
                  <label className="input-label">Title:</label>
                  <input
                    className="rounded-md bg-slate-950 border border-slate-700 text-slate-100"
                    value={l.title}
                    onChange={(ev) => handleLinkChange(l.key, "title", ev)}
                    type="text"
                    placeholder="title"
                  />
                  <label className="input-label">Subtitle:</label>
                  <input
                    className="rounded-md bg-slate-950 border border-slate-700 text-slate-100"
                    value={l.subtitle}
                    onChange={(ev) => handleLinkChange(l.key, "subtitle", ev)}
                    type="text"
                    placeholder="subtitle (optional)"
                  />
                  <label className="input-label">URL:</label>
                  <input
                    className="rounded-md bg-slate-950 border border-slate-700 text-slate-100"
                    value={l.url}
                    onChange={(ev) => handleLinkChange(l.key, "url", ev)}
                    type="text"
                    placeholder="url"
                  />
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                    <input
                      onChange={(ev) => handleFileUpload(ev, l.key)}
                      id={"file" + l.key}
                      type="file"
                      className="hidden"
                    />
                    <label
                      htmlFor={"file" + l.key}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-md border border-slate-700 bg-slate-900 text-slate-200 cursor-pointer hover:bg-slate-800 hover:text-slate-50"
                    >
                      {isIconLoading ? (
                        <div className="animate-pulse bg-gray-400 w-4 h-4 rounded-full" />
                      ) : (
                        <FontAwesomeIcon icon={faCloudArrowUp} />
                      )}
                      <span>Upload file for this link</span>
                    </label>
                    <p className="text-xs text-slate-500">
                      Uploaded files like PDFs will open in a new tab.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="border-t border-slate-800 pt-4 mt-8 max-w-xs mx-auto">
          <SubmitButton className="">
            {isIconLoading ? (
              <div className="animate-pulse bg-gray-400 w-4 h-4 rounded-full" />
            ) : (
              <FontAwesomeIcon icon={faSave} />
            )}
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
