import { Crop, type Icon as IconType, Trash } from "iconsax-reactjs";
import { Loader2, Upload, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
} from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Slider } from "./ui/slider";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

interface Point {
	x: number;
	y: number;
}

interface Area {
	x: number;
	y: number;
	width: number;
	height: number;
}

/**
 * Props for the ImageUploader component
 */
interface ImageUploaderProps {
	/**
	 * The URL of the currently selected/uploaded image
	 */
	value?: string | null;

	/**
	 * Callback when the image is changed/uploaded successfully
	 */
	onChange?: (url: string) => void;

	/**
	 * Async function to handle the actual upload
	 * Should return the final public URL of the uploaded file
	 */
	uploadFn?: (file: File) => Promise<string>;

	/**
	 * The aspect ratio of the cropped image (width / height)
	 * @default 1 (square)
	 */
	aspectRatio?: number;

	/**
	 * Maximum file size in bytes
	 * @default 5242880 (5MB)
	 */
	maxSize?: number;

	/**
	 * Allowed file types
	 * @default ['image/jpeg', 'image/png', 'image/webp']
	 */
	acceptedFileTypes?: string[];

	/**
	 * CSS class name for the container
	 */
	className?: string;

	/**
	 * Disabled state (e.g. during form submission)
	 */
	disabled?: boolean;

	/**
	 * Error message to display (for external form validation)
	 */
	errorMessage?: string;

	/**
	 * Callback function that returns the cropped image as a blob or file (legacy/manual mode)
	 */
	onImageCropped?: (blob: Blob) => void;
}

export function ImageUploader({
	value,
	onChange,
	uploadFn,
	aspectRatio = 1,
	maxSize = 5 * 1024 * 1024, // 5MB
	acceptedFileTypes = ["image/jpeg", "image/png"],
	className,
	disabled = false,
	errorMessage,
	onImageCropped,
}: ImageUploaderProps) {
	const [image, setImage] = useState<string | null>(null);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [internalError, setInternalError] = useState<string | null>(null);
	const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	// Initialize preview with passed value if available
	const previewImage = value;

	const openCropDialog = useCallback(() => setIsCropDialogOpen(true), []);
	const closeCropDialog = useCallback(() => setIsCropDialogOpen(false), []);

	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = (file: File | null) => {
		if (!file) return;

		setInternalError(null);

		if (!acceptedFileTypes.includes(file.type)) {
			setInternalError(
				`File type not supported. Accepted types: ${acceptedFileTypes.join(", ")}`,
			);
			return;
		}

		if (file.size > maxSize) {
			setInternalError(`File is too large. Maximum size: ${maxSize / (1024 * 1024)}MB`);
			return;
		}

		setSelectedFile(file);

		const reader = new FileReader();
		reader.onload = () => {
			setImage(reader.result as string);
			openCropDialog();
		};
		reader.readAsDataURL(file);
	};

	const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const processImage = useCallback(async () => {
		if (!image || !croppedAreaPixels) return;

		try {
			const canvas = document.createElement("canvas");
			const img = new Image();
			img.src = image;

			await new Promise((resolve) => {
				img.onload = resolve;
			});

			const scaleX = img.naturalWidth / img.width;
			const scaleY = img.naturalHeight / img.height;

			canvas.width = croppedAreaPixels.width;
			canvas.height = croppedAreaPixels.height;

			const ctx = canvas.getContext("2d");

			if (ctx) {
				ctx.drawImage(
					img,
					croppedAreaPixels.x * scaleX,
					croppedAreaPixels.y * scaleY,
					croppedAreaPixels.width * scaleX,
					croppedAreaPixels.height * scaleY,
					0,
					0,
					croppedAreaPixels.width,
					croppedAreaPixels.height,
				);

				// Get Blob from canvas
				const blob = await new Promise<Blob | null>((resolve) =>
					canvas.toBlob((b) => resolve(b), selectedFile?.type || "image/jpeg", 0.9)
				);

				if (!blob) {
					throw new Error("Failed to crop image");
				}

				// If uploadFn is provided, handle upload
				if (uploadFn && selectedFile) {
					setIsUploading(true);
					try {
						// Create a new File from the Blob to preserve name/type if needed
						const fileToUpload = new File([blob], selectedFile.name, {
							type: selectedFile.type,
							lastModified: Date.now(),
						});

						const uploadedUrl = await uploadFn(fileToUpload);
						onChange?.(uploadedUrl);
					} catch (err) {
						console.error("Upload error:", err);
						setInternalError("Failed to upload image. Please try again.");
					} finally {
						setIsUploading(false);
					}
				} else if (onImageCropped) {
					// Legacy/Manual mode
					onImageCropped(blob);
					// Locally preview current blob if no uploadFn
					const localUrl = URL.createObjectURL(blob);
					onChange?.(localUrl);
				}

				closeCropDialog();
			}
		} catch (e) {
			console.error("Image processing failed", e);
			setInternalError("Something went wrong while processing the image.");
		}
	}, [image, croppedAreaPixels, uploadFn, selectedFile, onChange, onImageCropped, closeCropDialog]);

	const clearImage = () => {
		onChange?.(""); // Clear the value
		setImage(null);
		setCroppedAreaPixels(null);
		setCrop({ x: 0, y: 0 });
		setZoom(1);
		setSelectedFile(null);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		if (!disabled && !isUploading && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			handleFileSelect(e.dataTransfer.files[0]);
		}
	};

	// Display error: either from internal validation or passed from parent (form)
	const displayedError = errorMessage || internalError;

	return (
		<div className={cn("w-full", className)}>
			<Card className={cn("w-full transition-all duration-200", displayedError && "border-destructive")}>
				<CardContent className="relative p-0">
					{!previewImage ? (
						<div
							className={cn(
								"border-2 border-dashed rounded-lg p-8 text-center transition-colors",
								disabled || isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-muted/20",
								displayedError ? "border-destructive/50 bg-destructive/5" : "border-muted-foreground/25"
							)}
							onDragOver={handleDragOver}
							onDragEnter={handleDragOver}
							onDragLeave={handleDragOver}
							onDrop={handleDrop}
							onClick={() => !disabled && !isUploading && inputRef.current?.click()}
						>
							<input
								ref={inputRef}
								type="file"
								className="hidden"
								accept={acceptedFileTypes.join(",")}
								disabled={disabled || isUploading}
								onChange={(e) =>
									handleFileSelect(e.target.files ? e.target.files[0] : null)
								}
							/>
							{isUploading ? (
								<Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />
							) : (
								<Upload className="mx-auto h-12 w-12 text-muted-foreground" />
							)}

							<div className="mt-4 space-y-1">
								<p className="text-sm font-medium text-foreground">
									{isUploading ? "Uploading..." : "Click to upload or drag and drop"}
								</p>
								<p className="text-xs text-muted-foreground uppercase">
									{acceptedFileTypes
										.map((type) => type.replace("image/", ""))
										.join(", ")}
									{" • "}
									Max {maxSize / (1024 * 1024)}MB
								</p>
							</div>
						</div>
					) : (
						<div className="relative rounded-lg overflow-hidden group">
							<img
								src={previewImage}
								alt="Preview"
								className="w-full h-auto object-cover bg-muted"
								style={{ aspectRatio: aspectRatio }}
							/>

							{/* Overlay Loading State */}
							{isUploading && (
								<div className="absolute inset-0 bg-background/50 flex items-center justify-center z-20 backdrop-blur-sm">
									<Loader2 className="h-10 w-10 text-primary animate-spin" />
								</div>
							)}

							<div className={cn(
								"absolute top-2 right-2 z-10 space-x-2 transition-opacity",
								isUploading || disabled ? "opacity-0" : "opacity-0 group-hover:opacity-100"
							)}>
								<IconButton
									Icon={Crop}
									actionTitle="Crop Image"
									onClick={openCropDialog}
									disabled={disabled || isUploading}
								/>
								<IconButton
									Icon={Trash}
									actionTitle="Remove Image"
									onClick={clearImage}
									disabled={disabled || isUploading}
								/>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
			{displayedError && (
				<p className="mt-2 text-sm text-destructive font-medium animate-in slide-in-from-top-1">
					{displayedError}
				</p>
			)}

			<Dialog open={isCropDialogOpen} onOpenChange={(open) => !isUploading && setIsCropDialogOpen(open)}>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle>Crop Image</DialogTitle>
					</DialogHeader>
					{image && (
						<>
							<div className="relative w-full h-[400px] bg-background">
								<Cropper
									image={image}
									crop={crop}
									zoom={zoom}
									aspect={aspectRatio}
									onCropChange={setCrop}
									onCropComplete={onCropComplete}
									onZoomChange={setZoom}
									showGrid
								/>
							</div>
							<div className="flex items-center gap-4 py-4">
								<ZoomOut className="h-4 w-4 text-muted-foreground" />
								<Slider
									value={[zoom]}
									min={1}
									max={3}
									step={0.1}
									onValueChange={(value) => setZoom(value[0])}
									className="flex-1"
								/>
								<ZoomIn className="h-4 w-4 text-muted-foreground" />
							</div>
							<div className="flex justify-end gap-2">
								<Button variant="ghost" onClick={closeCropDialog} disabled={isUploading}>
									Cancel
								</Button>
								<Button onClick={processImage} disabled={isUploading}>
									{isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
									Apply & Upload
								</Button>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

const IconButton = ({
	actionTitle,
	Icon,
	onClick,
	disabled
}: {
	actionTitle: string;
	Icon: IconType;
	onClick: VoidFunction;
	disabled?: boolean;
}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size="icon"
						variant="secondary"
						className="h-8 w-8 shadow-sm backdrop-blur-md bg-white/90 hover:bg-white dark:bg-black/80 dark:hover:bg-black"
						onClick={(e) => {
							e.stopPropagation();
							onClick();
						}}
						disabled={disabled}
					>
						<Icon size={16} />
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">{actionTitle}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
