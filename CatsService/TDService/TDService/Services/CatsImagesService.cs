//
//  Copyright (c) 2024 Docsvision. All rights reserved. 
//

namespace TDService.Services;

internal class CatsImagesService
{
    private readonly string[] _files;
    private readonly int _filesCount;
    private readonly Random _random;

    public CatsImagesService(IWebHostEnvironment env)
    {
        var directoryPath = Path.Combine(env.WebRootPath, "img");

        _files = Directory.GetFiles(directoryPath, "*.*", SearchOption.TopDirectoryOnly);
        _filesCount = _files.Length;
        _random = Random.Shared;
    }

    public IEnumerable<string> GetRandomImages(int count)
    {
        if (count == 0)
            return Enumerable.Empty<string>();

        if (count > _filesCount)
            count = _filesCount;

        return Enumerable.Range(0, count)
             .Select(_ =>
             {
                 var file = _files[_random.Next(_filesCount)];
                 return $"/img/{Path.GetFileName(file)}";
             });
    }
}