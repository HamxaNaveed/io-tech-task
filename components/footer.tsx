"use client";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Twitter, Facebook } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { addSubscriber, checkSubscriberExists } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSubscriptionStatus,
  setIsSubmitting,
  clearSubscriptionStatus,
} from "@/redux/features/formSlice";
import { useTranslations } from "next-intl";
import { FaFacebookF, FaTwitter, FaGooglePlusG } from "react-icons/fa";

const Footer = () => {
  const { language, isRTL } = useLanguage();
  const dispatch = useAppDispatch();
  const { subscriptionStatus, isSubmitting } = useAppSelector(
    (state) => state.form
  );
  const t = useTranslations();
  const footerT = useTranslations("footer");
  const commonT = useTranslations("common");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(footerT("invalidEmail"))
      .required(footerT("emailRequired")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(setIsSubmitting(true));

        const isDuplicate = await checkSubscriberExists(values.email);

        if (isDuplicate) {
          dispatch(
            setSubscriptionStatus({
              type: "error",
              message: footerT("alreadySubscribed"),
            })
          );
          return;
        }

        await addSubscriber(values.email);

        dispatch(
          setSubscriptionStatus({
            type: "success",
            message: footerT("thankYouSubscribing"),
          })
        );

        resetForm();

        setTimeout(() => {
          dispatch(clearSubscriptionStatus());
        }, 5000);
      } catch (error) {
        dispatch(
          setSubscriptionStatus({
            type: "error",
            message: footerT("errorOccurred"),
          })
        );
      } finally {
        dispatch(setIsSubmitting(false));
      }
    },
  });

  return (
    <footer className="bg-[#3E2723] text-white py-8">
      <div className="container-custom">
        {/* Top section with subscription and social media */}
        <div className="flex flex-col md:flex-row justify-end items-center mb-6 gap-8">
          {/* Subscription form */}
          <div className="flex items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="flex rounded overflow-hidden"
            >
              <input
                type="email"
                id="email"
                name="email"
                placeholder={commonT("email")}
                className="p-2 bg-white text-black w-[200px]"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                aria-label={commonT("email")}
              />
              <button
                type="submit"
                className="bg-[#5D4037] hover:bg-[#8D6E63] text-white py-2 px-4 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : commonT("subscribe")}
              </button>
            </form>
          </div>

          {/* Social media and contacts */}
          <div className="flex items-center gap-6">
            <span className="text-white">{commonT("contacts")}</span>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Twitter"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Google Plus"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaGooglePlusG className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-6"></div>

        {/* Bottom section with links and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Navigation links */}
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
            <Link
              href="#"
              className="text-white hover:text-gray-300 transition-colors"
            >
              {footerT("about")}
            </Link>
            <Link
              href="#"
              className="text-white hover:text-gray-300 transition-colors"
            >
              {footerT("ourStrategy")}
            </Link>
            <Link
              href="#"
              className="text-white hover:text-gray-300 transition-colors"
            >
              {footerT("ourAdvantages")}
            </Link>
            <Link
              href="#"
              className="text-white hover:text-gray-300 transition-colors"
            >
              {footerT("socialResponsibility")}
            </Link>
            <Link
              href="#"
              className="text-white hover:text-gray-300 transition-colors"
            >
              {footerT("ourServices")}
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-white text-sm">
            © {new Date().getFullYear()} {commonT("allRightsReserved")}
          </div>
        </div>

        {/* Form validation errors */}
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-400 text-sm mt-2 text-center md:text-right">
            {formik.errors.email}
          </div>
        )}

        {/* Subscription status message */}
        {subscriptionStatus.type && (
          <div
            className={`text-sm mt-2 text-center md:text-right ${
              subscriptionStatus.type === "success"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {subscriptionStatus.message}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
