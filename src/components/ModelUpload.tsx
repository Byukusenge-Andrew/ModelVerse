import { Upload } from 'lucide-react';
import { useVisualizationStore } from '../store/visualizationStore';
import { useCallback } from 'react';

export function ModelUpload() {
  const { setCustomModel, setIsLoading } = useVisualizationStore();

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsLoading(true);
      const gltfFile = Array.from(files).find(file => 
        file.name.toLowerCase().endsWith('.gltf')
      );

      if (!gltfFile) {
        alert('No GLTF file found in the selected folder');
        return;
      }
      const fileMap = new Map<string, string>();
      for (const file of Array.from(files)) {
        const objectUrl = URL.createObjectURL(file);
        fileMap.set(file.name, objectUrl);
      }
      const gltfContent = await gltfFile.text();
      const gltfJson = JSON.parse(gltfContent);
      if (gltfJson.images) {
        gltfJson.images = gltfJson.images.map((image: any) => {
          if (image.uri) {
            const fileName = image.uri.split('/').pop();
            const matchingFile = Array.from(fileMap.entries()).find(([key]) => 
              key.endsWith(fileName!)
            );
            if (matchingFile) {
              image.uri = matchingFile[1];
            }
          }
          return image;
        });
      }
      if (gltfJson.buffers) {
        gltfJson.buffers = gltfJson.buffers.map((buffer: any) => {
          if (buffer.uri) {
            const fileName = buffer.uri.split('/').pop();
            const matchingFile = Array.from(fileMap.entries()).find(([key]) => 
              key.endsWith(fileName!)
            );
            if (matchingFile) {
              buffer.uri = matchingFile[1];
            }
          }
          return buffer;
        });
      }

      const modifiedGltfBlob = new Blob(
        [JSON.stringify(gltfJson)], 
        { type: 'application/json' }
      );
      const modifiedGltfUrl = URL.createObjectURL(modifiedGltfBlob);

      setCustomModel(modifiedGltfUrl);

      return () => {
        fileMap.forEach(url => URL.revokeObjectURL(url));
        URL.revokeObjectURL(modifiedGltfUrl);
      };

    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing files. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [setCustomModel, setIsLoading]);

  return (
    <div className="relative">
      <input
        type="file"
        webkitdirectory=""
        directory=""
        multiple
        onChange={handleFileUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        title="Upload GLTF Folder"
      />
      <button
        className="p-2 hover:bg-indigo-100 rounded-full transition-colors"
        title="Upload GLTF Folder"
      >
        <Upload className="w-5 h-5 text-indigo-600" />
      </button>
    </div>
  );
}