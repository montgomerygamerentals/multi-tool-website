import type { ComponentType } from "react";
import Base64Tool from "@/components/tools/Base64Tool";
import BmiCalculator from "@/components/tools/BmiCalculator";
import AgeCalculator from "@/components/tools/AgeCalculator";
import CaseConverter from "@/components/tools/CaseConverter";
import CoinFlip from "@/components/tools/CoinFlip";
import ColorConverter from "@/components/tools/ColorConverter";
import DaysBetweenDates from "@/components/tools/DaysBetweenDates";
import DiceRoller from "@/components/tools/DiceRoller";
import FaviconGenerator from "@/components/tools/FaviconGenerator";
import FormatConverter from "@/components/tools/FormatConverter";
import ImageCompressor from "@/components/tools/ImageCompressor";
import ImageCropper from "@/components/tools/ImageCropper";
import ImageResizer from "@/components/tools/ImageResizer";
import JsonFormatter from "@/components/tools/JsonFormatter";
import ListShuffler from "@/components/tools/ListShuffler";
import TeamSplitter from "@/components/tools/TeamSplitter";
import LoanCalculator from "@/components/tools/LoanCalculator";
import LoremIpsum from "@/components/tools/LoremIpsum";
import NamePicker from "@/components/tools/NamePicker";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import PercentageCalculator from "@/components/tools/PercentageCalculator";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";
import RandomNumberGenerator from "@/components/tools/RandomNumberGenerator";
import RemoveDuplicates from "@/components/tools/RemoveDuplicates";
import TextDiff from "@/components/tools/TextDiff";
import TipCalculator from "@/components/tools/TipCalculator";
import UnitConverter from "@/components/tools/UnitConverter";
import WordCounter from "@/components/tools/WordCounter";
import YesNoPicker from "@/components/tools/YesNoPicker";

export const toolComponents: Record<string, ComponentType> = {
  "image-converter": () => (
    <FormatConverter defaultOutputFormat="image/png" lockFormat={false} />
  ),
  "image-compressor": ImageCompressor,
  "image-resizer": ImageResizer,
  "image-cropper": ImageCropper,
  "favicon-generator": FaviconGenerator,
  "jpg-to-png": () => (
    <FormatConverter
      defaultOutputFormat="image/png"
      accept="image/jpeg,image/jpg"
      lockFormat
      label="Convert JPG to PNG"
    />
  ),
  "png-to-jpg": () => (
    <FormatConverter
      defaultOutputFormat="image/jpeg"
      accept="image/png"
      lockFormat
      label="Convert PNG to JPG"
    />
  ),
  "png-to-webp": () => (
    <FormatConverter
      defaultOutputFormat="image/webp"
      accept="image/png"
      lockFormat
      label="Convert PNG to WebP"
    />
  ),
  "webp-to-png": () => (
    <FormatConverter
      defaultOutputFormat="image/png"
      accept="image/webp"
      lockFormat
      label="Convert WebP to PNG"
    />
  ),
  "qr-code-generator": QrCodeGenerator,
  "color-converter": ColorConverter,
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "remove-duplicates": RemoveDuplicates,
  "text-diff": TextDiff,
  "lorem-ipsum": LoremIpsum,
  "json-formatter": JsonFormatter,
  "base64-encoder": Base64Tool,
  "password-generator": PasswordGenerator,
  "unit-converter": UnitConverter,
  "bmi-calculator": BmiCalculator,
  "age-calculator": AgeCalculator,
  "days-between-dates": DaysBetweenDates,
  "percentage-calculator": PercentageCalculator,
  "tip-calculator": TipCalculator,
  "loan-calculator": LoanCalculator,
  "name-picker": NamePicker,
  "random-number-generator": RandomNumberGenerator,
  "coin-flip": CoinFlip,
  "dice-roller": DiceRoller,
  "list-shuffler": ListShuffler,
  "team-splitter": TeamSplitter,
  "yes-no-picker": YesNoPicker,
};
