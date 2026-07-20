import type { ComponentType } from "react";
import AmortizationSchedule from "@/components/tools/AmortizationSchedule";
import AprCalculator from "@/components/tools/AprCalculator";
import Base64Tool from "@/components/tools/Base64Tool";
import BmiCalculator from "@/components/tools/BmiCalculator";
import AgeCalculator from "@/components/tools/AgeCalculator";
import AspectRatioFinder from "@/components/tools/AspectRatioFinder";
import BreakEvenCalculator from "@/components/tools/BreakEvenCalculator";
import BudgetCalculator from "@/components/tools/BudgetCalculator";
import BuyingPowerCalculator from "@/components/tools/BuyingPowerCalculator";
import CaseConverter from "@/components/tools/CaseConverter";
import CodeComparison from "@/components/tools/CodeComparison";
import CoinFlip from "@/components/tools/CoinFlip";
import ColorConverter from "@/components/tools/ColorConverter";
import CompoundInterestCalculator from "@/components/tools/CompoundInterestCalculator";
import Contribution401kCalculator from "@/components/tools/Contribution401kCalculator";
import CreditCardPayoffCalculator from "@/components/tools/CreditCardPayoffCalculator";
import CurrencyConverter from "@/components/tools/CurrencyConverter";
import DaysBetweenDates from "@/components/tools/DaysBetweenDates";
import DebtPayoffCalculator from "@/components/tools/DebtPayoffCalculator";
import DiceRoller from "@/components/tools/DiceRoller";
import DiscountMarkupCalculator from "@/components/tools/DiscountMarkupCalculator";
import DownPaymentCalculator from "@/components/tools/DownPaymentCalculator";
import EmergencyFundCalculator from "@/components/tools/EmergencyFundCalculator";
import ExifViewer from "@/components/tools/ExifViewer";
import FaviconGenerator from "@/components/tools/FaviconGenerator";
import FormatConverter from "@/components/tools/FormatConverter";
import FractionDecimalConverter from "@/components/tools/FractionDecimalConverter";
import HashGenerator from "@/components/tools/HashGenerator";
import BackgroundRemover from "@/components/tools/BackgroundRemover";
import ImageCompressor from "@/components/tools/ImageCompressor";
import ImageCropper from "@/components/tools/ImageCropper";
import ImageResizer from "@/components/tools/ImageResizer";
import IncomeTaxEstimator from "@/components/tools/IncomeTaxEstimator";
import InflationCalculator from "@/components/tools/InflationCalculator";
import JsonFormatter from "@/components/tools/JsonFormatter";
import JsonGenerator from "@/components/tools/JsonGenerator";
import ListShuffler from "@/components/tools/ListShuffler";
import TeamSplitter from "@/components/tools/TeamSplitter";
import LoanCalculator from "@/components/tools/LoanCalculator";
import LoremIpsum from "@/components/tools/LoremIpsum";
import MarkdownEditor from "@/components/tools/MarkdownEditor";
import MortgageCalculator from "@/components/tools/MortgageCalculator";
import NamePicker from "@/components/tools/NamePicker";
import NetWorthCalculator from "@/components/tools/NetWorthCalculator";
import Notepad from "@/components/tools/Notepad";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import PdfTools from "@/components/tools/PdfTools";
import PercentageCalculator from "@/components/tools/PercentageCalculator";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";
import RandomNumberGenerator from "@/components/tools/RandomNumberGenerator";
import RefinanceCalculator from "@/components/tools/RefinanceCalculator";
import RegexTester from "@/components/tools/RegexTester";
import RemoveDuplicates from "@/components/tools/RemoveDuplicates";
import RetirementCalculator from "@/components/tools/RetirementCalculator";
import RoiCalculator from "@/components/tools/RoiCalculator";
import SalaryHourlyConverter from "@/components/tools/SalaryHourlyConverter";
import SalesTaxCalculator from "@/components/tools/SalesTaxCalculator";
import SudokuGame from "@/components/tools/SudokuGame";
import TextDiff from "@/components/tools/TextDiff";
import TimerTool from "@/components/tools/TimerTool";
import TipCalculator from "@/components/tools/TipCalculator";
import TimezoneConverter from "@/components/tools/TimezoneConverter";
import UnitConverter from "@/components/tools/UnitConverter";
import UuidGenerator from "@/components/tools/UuidGenerator";
import WordCounter from "@/components/tools/WordCounter";
import WordleGame from "@/components/tools/WordleGame";
import YesNoPicker from "@/components/tools/YesNoPicker";

export const toolComponents: Record<string, ComponentType> = {
  "image-converter": () => (
    <FormatConverter defaultOutputFormat="image/png" lockFormat={false} />
  ),
  "image-compressor": ImageCompressor,
  "image-resizer": ImageResizer,
  "image-cropper": ImageCropper,
  "aspect-ratio-finder": AspectRatioFinder,
  "background-remover": BackgroundRemover,
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
  "pdf-tools": PdfTools,
  "exif-viewer": ExifViewer,
  "word-counter": WordCounter,
  notepad: Notepad,
  "case-converter": CaseConverter,
  "remove-duplicates": RemoveDuplicates,
  "text-diff": TextDiff,
  "code-comparison": CodeComparison,
  "lorem-ipsum": LoremIpsum,
  "json-formatter": JsonFormatter,
  "json-generator": JsonGenerator,
  "base64-encoder": Base64Tool,
  "markdown-editor": MarkdownEditor,
  "regex-tester": RegexTester,
  "hash-generator": HashGenerator,
  "uuid-generator": UuidGenerator,
  "password-generator": PasswordGenerator,
  "unit-converter": UnitConverter,
  "bmi-calculator": BmiCalculator,
  "age-calculator": AgeCalculator,
  "days-between-dates": DaysBetweenDates,
  "percentage-calculator": PercentageCalculator,
  "fraction-decimal-converter": FractionDecimalConverter,
  "tip-calculator": TipCalculator,
  "loan-calculator": LoanCalculator,
  "debt-payoff-calculator": DebtPayoffCalculator,
  "mortgage-calculator": MortgageCalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "roi-calculator": RoiCalculator,
  "retirement-calculator": RetirementCalculator,
  "budget-calculator": BudgetCalculator,
  "sales-tax-calculator": SalesTaxCalculator,
  "income-tax-estimator": IncomeTaxEstimator,
  "currency-converter": CurrencyConverter,
  "salary-hourly-converter": SalaryHourlyConverter,
  "inflation-calculator": InflationCalculator,
  "buying-power-calculator": BuyingPowerCalculator,
  "refinance-calculator": RefinanceCalculator,
  "credit-card-payoff-calculator": CreditCardPayoffCalculator,
  "down-payment-calculator": DownPaymentCalculator,
  "amortization-schedule": AmortizationSchedule,
  "net-worth-calculator": NetWorthCalculator,
  "emergency-fund-calculator": EmergencyFundCalculator,
  "401k-calculator": Contribution401kCalculator,
  "apr-calculator": AprCalculator,
  "discount-markup-calculator": DiscountMarkupCalculator,
  "break-even-calculator": BreakEvenCalculator,
  "timezone-converter": TimezoneConverter,
  timer: TimerTool,
  "name-picker": NamePicker,
  "random-number-generator": RandomNumberGenerator,
  "coin-flip": CoinFlip,
  "dice-roller": DiceRoller,
  "list-shuffler": ListShuffler,
  "team-splitter": TeamSplitter,
  "yes-no-picker": YesNoPicker,
  sudoku: SudokuGame,
  wordle: WordleGame,
};
